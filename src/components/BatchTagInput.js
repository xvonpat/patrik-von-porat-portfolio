'use client';

import React, { useState, useCallback, useMemo, useSyncExternalStore } from 'react';
import { useForm, useFormFields } from '@payloadcms/ui';

const emptySubscribe = () => () => {};

/**
 * BatchTagInput
 *
 * Admin UI component for Payload CMS enabling fast batch copy-paste
 * of tags separated by commas, semicolons, or newlines.
 *
 * Integrates directly with Payload's Form state via useForm() and useFormFields()
 * to seamlessly synchronize with the underlying `tags` array field.
 */
export default function BatchTagInput() {
  const form = useForm();
  const [inputText, setInputText] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [replaceExisting, setReplaceExisting] = useState(false);

  // Client hydration check via React 19 useSyncExternalStore
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const canPasteClipboard = isClient && typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.readText);

  // Reactively track existing tags from Payload's form state
  const existingRows = useFormFields(([fields]) => {
    if (!fields) return [];
    const rows = fields?.tags?.rows || [];
    return rows.map((row, i) => {
      const tagVal = fields[`tags.${i}.tag`]?.value;
      return {
        id: row.id,
        index: i,
        tag: typeof tagVal === 'string' ? tagVal.trim() : '',
      };
    }).filter((item) => item.tag.length > 0);
  });

  // Parse input into distinct, trimmed tag candidates
  const parsedTags = useMemo(() => {
    if (!inputText.trim()) return [];
    // Split by comma, semicolon, or newline
    const rawTokens = inputText.split(/[,;\n\r]+/);
    const seen = new Set();
    const result = [];

    for (const token of rawTokens) {
      // Clean leading bullet marks (*, -, •), surrounding quotes, and extra whitespace
      let clean = token.replace(/^[\s*\-•"']+|[\s"']+$/g, '').trim();
      if (clean && !seen.has(clean.toLowerCase())) {
        seen.add(clean.toLowerCase());
        result.push(clean);
      }
    }
    return result;
  }, [inputText]);

  // Flash a temporary status message
  const showStatus = useCallback((msg, type = 'success') => {
    setStatusMessage({ text: msg, type });
    setTimeout(() => {
      setStatusMessage((curr) => (curr?.text === msg ? null : curr));
    }, 4500);
  }, []);

  // Handle adding tags in batch
  const handleAddTags = useCallback(() => {
    if (parsedTags.length === 0) return;

    if (!form || typeof form.addFieldRow !== 'function') {
      showStatus('Kunde inte nå Payload form-state.', 'error');
      return;
    }

    // Current rows count before adding
    const currentCount = existingRows.length;

    // If replace mode is checked, remove existing rows first
    if (replaceExisting && currentCount > 0) {
      for (let i = currentCount - 1; i >= 0; i--) {
        form.removeFieldRow({ path: 'tags', rowIndex: i });
      }
    }

    const currentExistingMap = new Set(
      replaceExisting ? [] : existingRows.map((r) => r.tag.toLowerCase())
    );

    let addedCount = 0;
    let skippedCount = 0;

    parsedTags.forEach((tagText) => {
      if (!replaceExisting && currentExistingMap.has(tagText.toLowerCase())) {
        skippedCount++;
        return;
      }

      currentExistingMap.add(tagText.toLowerCase());

      form.addFieldRow({
        path: 'tags',
        subFieldState: {
          tag: {
            value: tagText,
            initialValue: tagText,
            valid: true,
          },
        },
      });
      addedCount++;
    });

    if (addedCount > 0) {
      form.setModified(true);
      setInputText('');

      if (skippedCount > 0) {
        showStatus(`✓ Lade till ${addedCount} ${addedCount === 1 ? 'tagg' : 'taggar'} (${skippedCount} fanns redan).`, 'success');
      } else {
        showStatus(`✓ Lade till ${addedCount} ${addedCount === 1 ? 'tagg' : 'taggar'}!`, 'success');
      }
    } else if (skippedCount > 0) {
      showStatus(`Alla ${skippedCount} ${skippedCount === 1 ? 'taggen fanns' : 'taggarna fanns'} redan.`, 'info');
    }
  }, [parsedTags, form, existingRows, replaceExisting, showStatus]);

  // Remove a single tag by row index
  const handleRemoveTag = useCallback((rowIndex, tagLabel) => {
    if (!form || typeof form.removeFieldRow !== 'function') return;
    form.removeFieldRow({ path: 'tags', rowIndex });
    form.setModified(true);
    showStatus(`Tog bort tagg "${tagLabel}".`, 'info');
  }, [form, showStatus]);

  // Clear all current tags
  const handleClearAll = useCallback(() => {
    if (!form || typeof form.removeFieldRow !== 'function') return;
    if (existingRows.length === 0) return;

    if (!window.confirm(`Vill du verkligen ta bort alla ${existingRows.length} taggar?`)) {
      return;
    }

    for (let i = existingRows.length - 1; i >= 0; i--) {
      form.removeFieldRow({ path: 'tags', rowIndex: i });
    }
    form.setModified(true);
    showStatus('Alla taggar togs bort.', 'info');
  }, [form, existingRows, showStatus]);

  // One-click clipboard paste if supported
  const handleClipboardPaste = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setInputText((prev) => (prev ? `${prev}, ${text.trim()}` : text.trim()));
          showStatus('Klistrade in från urklipp.', 'info');
        } else {
          showStatus('Urklipp är tomt.', 'info');
        }
      }
    } catch (err) {
      console.warn('[BatchTagInput] Clipboard access denied or unsupported:', err);
      showStatus('Urklippsåtkomst nekades. Klistra in manuellt med Ctrl+V / Cmd+V.', 'info');
    }
  }, [showStatus]);

  // Handle keydown in textarea: Enter (without Shift) triggers add
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTags();
    }
  }, [handleAddTags]);

  return (
    <div
      style={{
        marginBottom: '16px',
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: '#0c0d12',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
        fontFamily: 'inherit',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#c084fc',
              fontWeight: 700,
            }}
          >
            Batch Add Tags
          </span>
          <span
            style={{
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '999px',
              backgroundColor: 'rgba(168, 85, 247, 0.15)',
              color: '#e9d5ff',
              border: '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            Komma-avgränsning
          </span>
        </div>

        {canPasteClipboard && (
          <button
            type="button"
            onClick={handleClipboardPaste}
            title="Klistra in från urklipp"
            style={{
              fontSize: '11px',
              color: '#a1a1aa',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '2px 6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f4f4f5';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#a1a1aa';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            📋 Klistra in
          </button>
        )}
      </div>

      <p
        style={{
          fontSize: '11px',
          color: '#71717a',
          margin: '0 0 8px 0',
          lineHeight: '1.4',
        }}
      >
        Klistra in flera taggar separerade med komma, semikolon eller nyrad. Tryck sedan på knappen eller <strong>Enter</strong>.
      </p>

      {/* Input textarea */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="t.ex. Realmforged, Guitar Solo, Lean Six Sigma, Audio Production"
        rows={2}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: '#12131a',
          color: '#f4f4f5',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '6px',
          padding: '8px 10px',
          fontSize: '12px',
          lineHeight: '1.4',
          resize: 'vertical',
          outline: 'none',
          marginBottom: '8px',
          fontFamily: 'inherit',
          transition: 'border-color 0.15s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#a855f7';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }}
      />

      {/* Action Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <button
          type="button"
          onClick={handleAddTags}
          disabled={parsedTags.length === 0}
          style={{
            background: parsedTags.length > 0
              ? 'linear-gradient(135deg, #7928ca 0%, #a855f7 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            color: parsedTags.length > 0 ? '#ffffff' : '#52525b',
            border: parsedTags.length > 0
              ? '1px solid rgba(168, 85, 247, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '5px 12px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: parsedTags.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>+ Lägg till</span>
          {parsedTags.length > 0 && (
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                color: '#fff',
                padding: '0 5px',
                borderRadius: '999px',
                fontSize: '10px',
              }}
            >
              {parsedTags.length}
            </span>
          )}
        </button>

        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            color: '#a1a1aa',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={replaceExisting}
            onChange={(e) => setReplaceExisting(e.target.checked)}
            style={{
              accentColor: '#a855f7',
              cursor: 'pointer',
              margin: 0,
            }}
          />
          <span>Ersätt befintliga</span>
        </label>
      </div>

      {/* Status banner */}
      {statusMessage && (
        <div
          style={{
            padding: '6px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            marginBottom: '8px',
            backgroundColor: statusMessage.type === 'error'
              ? 'rgba(239, 68, 68, 0.15)'
              : statusMessage.type === 'success'
              ? 'rgba(34, 197, 94, 0.15)'
              : 'rgba(168, 85, 247, 0.15)',
            border: `1px solid ${
              statusMessage.type === 'error'
                ? 'rgba(239, 68, 68, 0.3)'
                : statusMessage.type === 'success'
                ? 'rgba(34, 197, 94, 0.3)'
                : 'rgba(168, 85, 247, 0.3)'
            }`,
            color: statusMessage.type === 'error'
              ? '#fca5a5'
              : statusMessage.type === 'success'
              ? '#86efac'
              : '#e9d5ff',
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Active tags chip display */}
      {existingRows.length > 0 && (
        <div
          style={{
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#71717a',
              }}
            >
              Aktiva taggar ({existingRows.length})
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              style={{
                fontSize: '10px',
                color: '#f87171',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                textDecoration: 'underline',
              }}
            >
              Rensa alla
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
            }}
          >
            {existingRows.map((row) => (
              <span
                key={row.id || `${row.index}-${row.tag}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  color: '#e9d5ff',
                  borderRadius: '999px',
                  padding: '2px 8px 2px 10px',
                  fontSize: '11px',
                  lineHeight: '1.2',
                }}
              >
                <span>{row.tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(row.index, row.tag)}
                  title={`Ta bort "${row.tag}"`}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#c084fc',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: '1',
                    padding: '0 2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f87171';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#c084fc';
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
