'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './WorkbenchView.module.css';
import WorkbenchGalleryModal from './WorkbenchGalleryModal';

export function WorkbenchView() {
  const [config, setConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);

  // Flow step: 'input' | 'suggestions' | 'draft' | 'success'
  const [step, setStep] = useState('input');

  // Input state
  const [note, setNote] = useState('');
  const [image, setImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [featuredImageKey, setFeaturedImageKey] = useState(null);
  const [attachGalleryImage, setAttachGalleryImage] = useState(true);
  const [imageAlt, setImageAlt] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [showRules, setShowRules] = useState(false);

  // Suggestion results
  const [observations, setObservations] = useState('');
  const [missingInfo, setMissingInfo] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [userClarification, setUserClarification] = useState('');

  // Draft state
  const [draftTitle, setDraftTitle] = useState('');
  const [draftExcerpt, setDraftExcerpt] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftCategory, setDraftCategory] = useState('');
  const [draftTags, setDraftTags] = useState('');
  const [draftSeoTitle, setDraftSeoTitle] = useState('');
  const [draftMetaDesc, setDraftMetaDesc] = useState('');
  const [formatAdvice, setFormatAdvice] = useState('');
  const [socialCaptions, setSocialCaptions] = useState(null);
  const [clarificationQuestion, setClarificationQuestion] = useState('');
  const [copiedPlatform, setCopiedPlatform] = useState(null);
  const [attachImage, setAttachImage] = useState(true);

  // Status & loading
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);
  const [savedPost, setSavedPost] = useState(null);

  const fileInputRef = useRef(null);

  // Load config on mount
  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/workbench/config');
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
          if (data?.categories?.length > 0) {
            setDraftCategory(data.categories[0].slug || data.categories[0].id);
          }
        }
      } catch (err) {
        console.warn('Failed to load workbench config:', err);
      } finally {
        setLoadingConfig(false);
      }
    }
    loadConfig();
  }, []);

  // Handle file selection (from device)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setError('Please select valid image files (JPEG, PNG, WebP).');
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const id = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setSelectedImages((prev) => {
          const next = [
            ...prev,
            {
              id,
              source: 'upload',
              title,
              filename: file.name,
              dataUrl: reader.result,
              thumb: reader.result,
              alt: title,
            },
          ];
          setFeaturedImageKey((curr) => curr || id);
          return next;
        });
        setImage(reader.result); // backward compatibility
      };
      reader.readAsDataURL(file);
    });

    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmGallerySelection = (newGalleryItems) => {
    setSelectedImages((prev) => {
      const uploads = prev.filter((img) => img.source === 'upload');
      const merged = [...uploads, ...newGalleryItems];
      setFeaturedImageKey((curr) => {
        if (curr && merged.some((i) => (i.id || i.src) === curr)) return curr;
        return merged[0]?.id || merged[0]?.src || null;
      });
      return merged;
    });
  };

  const handleRemoveImage = (imgKey) => {
    setSelectedImages((prev) => {
      const filtered = prev.filter((img) => (img.id || img.src) !== imgKey);
      setFeaturedImageKey((curr) => {
        if (curr === imgKey) {
          return filtered[0]?.id || filtered[0]?.src || null;
        }
        return curr;
      });
      return filtered;
    });
  };

  const handleSetFeatured = (imgKey) => {
    setFeaturedImageKey(imgKey);
  };

  // 1. Get Suggestions
  const handleGetSuggestions = async (e) => {
    e?.preventDefault();
    if (!note.trim() && selectedImages.length === 0) {
      setError('Please add a short note, choose photo(s) from the gallery, upload an image, or both.');
      return;
    }

    setLoading(true);
    setLoadingMessage(
      selectedImages.length > 1
        ? `Analyzing note and ${selectedImages.length} images for 3 story angles...`
        : 'Analyzing material and generating 3 distinct story angles...'
    );
    setError(null);

    try {
      const res = await fetch('/api/workbench/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          note,
          images: selectedImages,
          customInstructions,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to generate suggestions.');
      }

      setObservations(data.observations || '');
      setMissingInfo(data.missingInformation || '');
      setSuggestions(data.suggestions || []);
      setStep('suggestions');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Select suggestion and generate draft
  const handleSelectSuggestion = async (suggestion) => {
    setSelectedSuggestion(suggestion);
    setLoading(true);
    setLoadingMessage(`Drafting "${suggestion.title}"...`);
    setError(null);

    try {
      const res = await fetch('/api/workbench/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suggestion,
          note,
          images: selectedImages,
          userClarification,
          customInstructions,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to generate draft.');
      }

      const d = data.draft;
      setDraftTitle(d.title || suggestion.title);
      setDraftExcerpt(d.excerpt || '');
      setDraftContent(d.contentMarkdown || '');
      setDraftCategory(d.suggestedCategory || suggestion.suggestedCategory || 'Making');
      setDraftTags(Array.isArray(d.tags) ? d.tags.join(', ') : '');
      setDraftSeoTitle(d.seoTitle || d.title || suggestion.title);
      setDraftMetaDesc(d.metaDescription || d.excerpt || '');
      setFormatAdvice(d.formatAdvice || '');
      setSocialCaptions(d.socialCaptions || null);
      setClarificationQuestion(d.clarificationQuestion || '');
      setAttachImage(false); // Unchecked by default
      setAttachGalleryImage(true); // Default true since gallery image already exists on site
      setStep('draft');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Save as draft
  const handleSaveDraft = async () => {
    if (!draftTitle.trim()) {
      setError('A title is required to save the draft.');
      return;
    }

    setLoading(true);
    setLoadingMessage('Saving new post as draft in Payload CMS...');
    setError(null);

    try {
      const tagsArray = draftTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      // Determine featured gallery image and upload image
      const featuredImg = selectedImages.find((img) => (img.id || img.src) === featuredImageKey) || selectedImages[0];
      const isGalleryFeatured = featuredImg?.source === 'gallery';
      const galleryImg = isGalleryFeatured ? featuredImg : selectedImages.find((i) => i.source === 'gallery');
      const uploadImg = !isGalleryFeatured && featuredImg?.source === 'upload' ? featuredImg : selectedImages.find((i) => i.source === 'upload');

      const res = await fetch('/api/workbench/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: draftTitle,
          excerpt: draftExcerpt,
          contentMarkdown: draftContent,
          category: draftCategory,
          tags: tagsArray,
          seoTitle: draftSeoTitle,
          metaDescription: draftMetaDesc,
          attachImage: Boolean(attachImage && uploadImg?.dataUrl),
          image: attachImage && uploadImg?.dataUrl ? uploadImg.dataUrl : null,
          imageAlt: imageAlt || uploadImg?.title || draftTitle,
          galleryImageId: galleryImg?.payloadId || null,
          galleryImageSrc: galleryImg?.src || null,
          attachGalleryImage: Boolean(attachGalleryImage && galleryImg),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to save draft.');
      }

      setSavedPost(data.post);
      setStep('success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text, platform) => {
    if (!text) return;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPlatform(platform);
      setTimeout(() => {
        setCopiedPlatform(null);
      }, 2000);
    }
  };

  const handleReset = () => {
    setNote('');
    setSelectedImages([]);
    setImage(null);
    setImageAlt('');
    setFeaturedImageKey(null);
    setSuggestions([]);
    setSelectedSuggestion(null);
    setUserClarification('');
    setSavedPost(null);
    setSocialCaptions(null);
    setClarificationQuestion('');
    setCopiedPlatform(null);
    setError(null);
    setStep('input');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.topNavRow}>
          <Link href="/admin" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Workbench Assistant</span>
        </div>

        <div className={styles.badgeRow}>
          <span className={styles.privateBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Private Assistant
          </span>
          <span className={styles.modelBadge}>
            {config?.activeModel || 'gpt-4o'}
          </span>
        </div>
        <h1 className={styles.mainTitle}>Workbench Assistant</h1>
        <p className={styles.subTitle}>
          Turn casual workshop notes, photos, and project milestones into authentic website updates and stories.
        </p>
      </header>

      {/* Missing API Key Warning State */}
      {!loadingConfig && config && !config.isApiKeyConfigured && (
        <div className={styles.setupAlert}>
          <div className={styles.setupAlertTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            OpenAI API Key Required
          </div>
          <p className={styles.setupAlertText}>
            To enable AI suggestions, please add your <span className={styles.codePill}>OPENAI_API_KEY</span> to{' '}
            <span className={styles.codePill}>.env</span> and restart the development server. The server uses the OpenAI
            Responses API with vision support.
          </p>
        </div>
      )}

      {/* Error Banner with Retry */}
      {error && (
        <div className={styles.errorBanner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span><strong>Error:</strong> {error}</span>
            {step === 'input' && (
              <button
                type="button"
                onClick={handleGetSuggestions}
                disabled={loading}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ffffff',
                  borderRadius: '4px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Retry
              </button>
            )}
            {step === 'suggestions' && selectedSuggestion && (
              <button
                type="button"
                onClick={() => handleSelectSuggestion(selectedSuggestion)}
                disabled={loading}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ffffff',
                  borderRadius: '4px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Retry Draft
              </button>
            )}
            {step === 'draft' && (
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ffffff',
                  borderRadius: '4px',
                  padding: '0.2rem 0.55rem',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Retry Save
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            style={{ background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer', fontSize: '1rem', padding: '0 0.25rem' }}
            title="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {/* STEP 1: Input Phase */}
      {step === 'input' && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            What is on your workbench?
          </h2>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="note-input">
              Working Note or Observation
              <span className={styles.subLabel}>(English or Swedish — casual notes welcome)</span>
            </label>
            <textarea
              id="note-input"
              className={styles.textarea}
              placeholder="e.g., Started sanding the Eddie parts. Some support marks are difficult to remove without flattening the curved shoulder..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <label className={styles.label} style={{ margin: 0 }}>
                Photos from the Workbench
                <span className={styles.subLabel}>
                  ({selectedImages.length} selected — choose from existing gallery, upload, or both)
                </span>
              </label>
            </div>

            {/* Action Buttons: Choose from Gallery & Upload */}
            <div className={styles.imageActionsRow}>
              <button
                type="button"
                className={styles.galleryBtn}
                onClick={() => setIsGalleryModalOpen(true)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                Choose from Photo Gallery
                {selectedImages.filter((i) => i.source === 'gallery').length > 0 && (
                  <span
                    style={{
                      background: '#a855f7',
                      color: '#ffffff',
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      marginLeft: '2px',
                    }}
                  >
                    {selectedImages.filter((i) => i.source === 'gallery').length}
                  </span>
                )}
              </button>

              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Upload from Device
              </button>
            </div>

            {/* Selected Images Grid */}
            {selectedImages.length > 0 && (
              <div>
                <div className={styles.selectedImagesGrid}>
                  {selectedImages.map((img) => {
                    const key = img.id || img.src;
                    const isFeatured = featuredImageKey === key;

                    return (
                      <div
                        key={key}
                        className={`${styles.selectedImageCard} ${isFeatured ? styles.isFeatured : ''}`}
                      >
                        <button
                          type="button"
                          className={styles.removeImageCardBtn}
                          onClick={() => handleRemoveImage(key)}
                          title="Remove image"
                        >
                          ✕
                        </button>

                        <div className={styles.selectedImageThumbWrapper}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.thumb || img.src || img.dataUrl}
                            alt={img.title || 'Selected photo'}
                            className={styles.selectedImageThumb}
                          />
                        </div>

                        <div className={styles.selectedImageMeta}>
                          <div className={styles.selectedImageTitle} title={img.title}>
                            {img.title || 'Photo'}
                          </div>

                          <div className={styles.selectedImageBadgeRow}>
                            <span
                              className={`${styles.sourceBadge} ${
                                img.source === 'gallery' ? styles.sourceBadgeGallery : styles.sourceBadgeUpload
                              }`}
                            >
                              {img.source === 'gallery' ? 'Gallery' : 'Upload'}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleSetFeatured(key)}
                              className={`${styles.featuredStarBtn} ${isFeatured ? styles.featuredStarBtnActive : ''}`}
                              title={isFeatured ? 'Primary featured photo' : 'Click to make this the featured photo'}
                            >
                              {isFeatured ? '★ Featured' : '☆ Set featured'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '0.75rem' }}>
                  💡 <em>Click <strong>Set featured</strong> on any image to use it as the main header photo for the resulting post.</em>
                </div>
              </div>
            )}

            {/* Drop Zone fallback when no images selected yet */}
            {selectedImages.length === 0 && (
              <div
                className={styles.dropZone}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files || []);
                  if (files.length > 0) {
                    const fakeEvent = { target: { files } };
                    handleFileChange(fakeEvent);
                  }
                }}
              >
                <div className={styles.dropZoneIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className={styles.dropZoneText}>Tap to choose photos from device or drag & drop</p>
                <p className={styles.dropZoneSubtext}>You can also click &ldquo;Choose from Photo Gallery&rdquo; above to select existing work</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className={styles.hiddenFileInput}
              onChange={handleFileChange}
            />
            <p className={styles.privacyNote}>
              🔒 Privacy notice: Submitted notes and photos are transmitted securely to OpenAI via the server-side API
              for multimodal analysis. Unattached images are NOT published or saved to website media storage.
            </p>
          </div>

          {/* Collapsible Style Rules & Directives */}
          <div className={styles.accordion}>
            <button
              type="button"
              className={styles.accordionHeader}
              onClick={() => setShowRules(!showRules)}
            >
              <span>Writing Editor Context &amp; Voice Preservation</span>
              <span>{showRules ? '▲' : '▼'}</span>
            </button>
            {showRules && (
              <div className={styles.accordionBody}>
                {config?.voicePreservationPrinciple && (
                  <div className={styles.principleBanner}>
                    <div className={styles.principleTitle}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Voice Preservation Principle
                    </div>
                    <p className={styles.principleText}>
                      &ldquo;{config.voicePreservationPrinciple}&rdquo;
                    </p>
                  </div>
                )}

                <div style={{ fontWeight: 600, fontSize: '11px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                  Global Writing Rules
                </div>
                <ul className={styles.ruleList}>
                  {config?.startingRules?.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>

                <p className={styles.priorityNote}>
                  <strong>Hierarchy:</strong> Source Facts &gt; Voice Preservation &gt; Global Context &gt; Session Directives &gt; Platform Limits
                </p>

                <div style={{ marginTop: '0.95rem' }}>
                  <label className={styles.label} htmlFor="custom-instructions">
                    Session Directives (Optional override for this prompt)
                  </label>
                  <input
                    id="custom-instructions"
                    type="text"
                    className={styles.input}
                    placeholder="e.g. Adapt as an Instagram caption, focus on why I rebuilt the mesh..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                  />
                  <p className={styles.directivesHelp}>
                    Use session directives to specify tone, platform, length, or angle. They complement the global context and cannot override facts or the Voice Preservation Principle.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className={styles.primaryBtn}
            onClick={handleGetSuggestions}
            disabled={loading || (!note.trim() && !image)}
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                {loadingMessage}
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Generate 3 Story Suggestions
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 2: Suggestions Phase */}
      {step === 'suggestions' && (
        <div>
          {selectedImages.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: '#a1a1aa', whiteSpace: 'nowrap' }}>
                Referenced Photos ({selectedImages.length}):
              </span>
              {selectedImages.map((img) => (
                <div
                  key={img.id || img.src}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: '#18181b',
                  }}
                  title={img.title}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.thumb || img.src || img.dataUrl}
                    alt={img.title || 'Selected photo'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}

          {observations && (
            <div className={styles.card} style={{ marginBottom: '1rem', padding: '1rem 1.25rem' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#a1a1aa', fontWeight: 600, letterSpacing: '0.05em' }}>
                Workbench Observations
              </div>
              <p style={{ margin: '0.35rem 0 0 0', fontSize: '14px', color: '#d4d4d8', lineHeight: 1.5 }}>
                {observations}
              </p>
              {missingInfo && (
                <div style={{ marginTop: '0.5rem', fontSize: '13px', color: '#fbbf24' }}>
                  <strong>Note:</strong> {missingInfo}
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
              Choose a Content Angle
            </h2>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setStep('input')}
              style={{ padding: '0.45rem 0.85rem', fontSize: '13px' }}
            >
              ← Back to Material
            </button>
          </div>

          <div className={styles.suggestionsList}>
            {suggestions.map((sugg, idx) => (
              <div key={sugg.id || idx} className={styles.suggestionCard}>
                <div className={styles.suggHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={styles.formatBadge}>{sugg.format}</span>
                    <span className={styles.categoryPill}>{sugg.suggestedCategory}</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#71717a' }}>Option {idx + 1}</span>
                </div>

                <h3 className={styles.suggTitle}>{sugg.title}</h3>
                <p className={styles.suggAngle}>{sugg.angle}</p>

                <div className={styles.suggFitBox}>
                  <p className={styles.suggFitText}>
                    <strong>Why it fits:</strong> {sugg.fitReason}
                  </p>
                </div>

                {sugg.suggestedTags?.length > 0 && (
                  <div className={styles.tagRow}>
                    {sugg.suggestedTags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.tagChip}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {sugg.followUpQuestion && (
                  <div className={styles.questionAlert}>
                    <strong>Craft question:</strong> {sugg.followUpQuestion}
                  </div>
                )}

                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => handleSelectSuggestion(sugg)}
                  disabled={loading}
                >
                  {loading && selectedSuggestion?.id === sugg.id ? (
                    <>
                      <span className={styles.spinner} />
                      {loadingMessage}
                    </>
                  ) : (
                    <>Select & Generate Draft →</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Draft Editor Phase */}
      {step === 'draft' && (
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 className={styles.cardTitle} style={{ margin: 0 }}>
              Edit Draft
            </h2>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setStep('suggestions')}
              style={{ padding: '0.45rem 0.85rem', fontSize: '13px' }}
            >
              ← Back to Suggestions
            </button>
          </div>

          {clarificationQuestion && (
            <div className={styles.clarificationBanner}>
              <div className={styles.clarificationHeader}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Craft Clarification Note
              </div>
              <p style={{ margin: 0 }}>
                {clarificationQuestion}
              </p>
            </div>
          )}

          {formatAdvice && (
            <div className={styles.formatAdviceBox}>
              <strong>Format guidance:</strong> {formatAdvice}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="draft-title">
              Post Title
            </label>
            <input
              id="draft-title"
              type="text"
              className={styles.input}
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="draft-excerpt">
              Excerpt (Summary lead)
            </label>
            <textarea
              id="draft-excerpt"
              className={styles.textarea}
              style={{ minHeight: '70px' }}
              value={draftExcerpt}
              onChange={(e) => setDraftExcerpt(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label className={styles.label} htmlFor="draft-category">
                Category
              </label>
              <select
                id="draft-category"
                className={styles.select}
                value={draftCategory}
                onChange={(e) => setDraftCategory(e.target.value)}
              >
                {config?.categories?.map((c) => (
                  <option key={c.slug || c.id} value={c.slug || c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={styles.label} htmlFor="draft-tags">
                Tags (Comma-separated)
              </label>
              <input
                id="draft-tags"
                type="text"
                className={styles.input}
                value={draftTags}
                onChange={(e) => setDraftTags(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="draft-content">
              Content Body (Markdown)
            </label>
            <textarea
              id="draft-content"
              className={styles.textarea}
              style={{ minHeight: '260px', fontFamily: 'monospace', fontSize: '14px' }}
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
            />
          </div>

          {/* Social Media Adaptations */}
          {socialCaptions && (socialCaptions.instagram || socialCaptions.x) && (
            <div className={styles.socialSection}>
              <div className={styles.socialTitle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Platform-Adapted Social Captions
              </div>
              <div className={styles.socialGrid}>
                {socialCaptions.instagram && (
                  <div className={styles.socialCard}>
                    <div>
                      <div className={styles.socialHeader}>
                        <span className={styles.platformPill}>
                          <span>📸</span> Instagram
                        </span>
                        <span className={styles.charCount}>
                          {socialCaptions.instagram.length} chars
                        </span>
                      </div>
                      <div className={styles.socialBody}>
                        {socialCaptions.instagram}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`${styles.copyBtn} ${copiedPlatform === 'instagram' ? styles.copyBtnCopied : ''}`}
                      onClick={() => handleCopyText(socialCaptions.instagram, 'instagram')}
                    >
                      {copiedPlatform === 'instagram' ? '✓ Copied!' : 'Copy Caption'}
                    </button>
                  </div>
                )}

                {socialCaptions.x && (
                  <div className={styles.socialCard}>
                    <div>
                      <div className={styles.socialHeader}>
                        <span className={styles.platformPill}>
                          <span>𝕏</span> X (Twitter)
                        </span>
                        <span className={`${styles.charCount} ${socialCaptions.x.length <= 280 ? styles.charCountValid : ''}`}>
                          {socialCaptions.x.length} / 280
                        </span>
                      </div>
                      <div className={styles.socialBody}>
                        {socialCaptions.x}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`${styles.copyBtn} ${copiedPlatform === 'x' ? styles.copyBtnCopied : ''}`}
                      onClick={() => handleCopyText(socialCaptions.x, 'x')}
                    >
                      {copiedPlatform === 'x' ? '✓ Copied!' : 'Copy Post'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Option A: Gallery Image attachment */}
          {selectedImages.some((i) => i.source === 'gallery') && (
            <div
              className={styles.formGroup}
              style={{
                background: 'rgba(168, 85, 247, 0.06)',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                marginBottom: '1.25rem',
              }}
            >
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={attachGalleryImage}
                  onChange={(e) => setAttachGalleryImage(e.target.checked)}
                />
                <span>
                  Set photo from gallery as Post Featured Image:{' '}
                  <strong>
                    {selectedImages.find((i) => i.source === 'gallery' && (i.id || i.src) === featuredImageKey)?.title ||
                      selectedImages.find((i) => i.source === 'gallery')?.title ||
                      'Gallery Image'}
                  </strong>
                </span>
              </label>
              <div style={{ marginTop: '0.35rem', fontSize: '12px', color: '#a1a1aa', paddingLeft: '1.5rem' }}>
                ✓ Direct reference to existing photo gallery asset. No duplicate storage upload needed.
              </div>
            </div>
          )}

          {/* Option B: Uploaded Image attachment */}
          {selectedImages.some((i) => i.source === 'upload') && (
            <div
              className={styles.formGroup}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '0.85rem 1rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '1.25rem',
              }}
            >
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={attachImage}
                  onChange={(e) => setAttachImage(e.target.checked)}
                />
                Upload submitted photo from device as post Featured Image (Unchecked by default)
              </label>

              <div style={{ marginTop: '0.45rem', fontSize: '13px', color: '#fbbf24', lineHeight: 1.45, paddingLeft: '1.5rem' }}>
                ⚠️ <strong>Media storage notice:</strong> Attaching this uploaded image uploads it to the website&apos;s public media storage (Supabase S3 bucket).
              </div>

              {attachImage && (
                <div style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Image Alt text (required for media accessibility)"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          <div className={styles.draftActionsBar}>
            <div style={{ fontSize: '13px', color: '#a1a1aa' }}>
              Status: <span style={{ color: '#fbbf24', fontWeight: 600 }}>Draft</span> (will not be published automatically)
            </div>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={handleSaveDraft}
              disabled={loading || !draftTitle.trim()}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  {loadingMessage}
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save as Draft
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Saved Success Phase */}
      {step === 'success' && savedPost && (
        <div className={styles.successCard}>
          <div className={styles.successIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>Draft Post Created</h2>
          <p className={styles.successDesc}>
            &ldquo;{savedPost.title}&rdquo; has been saved with status <strong>Draft</strong>. You can now edit it in Payload CMS,
            review the layout, or preview it directly on your site.
          </p>

          <div className={styles.successBtnRow}>
            {savedPost.editUrl && (
              <a
                href={savedPost.editUrl}
                className={styles.primaryBtn}
                target="_blank"
                rel="noreferrer"
              >
                Open in Payload Editor ↗
              </a>
            )}
            {savedPost.previewUrl && (
              <a
                href={savedPost.previewUrl}
                className={styles.secondaryBtn}
                target="_blank"
                rel="noreferrer"
              >
                Preview Draft ↗
              </a>
            )}
            <button type="button" className={styles.secondaryBtn} onClick={handleReset}>
              Draft Another Work
            </button>
            <Link href="/admin" className={styles.secondaryBtn}>
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* Gallery Modal Picker */}
      {isGalleryModalOpen && (
        <WorkbenchGalleryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          selectedImages={selectedImages.filter((i) => i.source === 'gallery')}
          onConfirmSelection={handleConfirmGallerySelection}
        />
      )}
    </div>
  );
}

export default WorkbenchView;
