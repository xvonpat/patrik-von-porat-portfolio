import assert from 'node:assert';
import {
  VOICE_PRESERVATION_PRINCIPLE,
  GLOBAL_WRITING_CONTEXT,
  PRIORITY_HIERARCHY,
  WORKBENCH_DEFAULT_CONFIG,
  buildWorkbenchPromptInstructions,
} from '../src/lib/workbench/styleConfig.ts';

console.log('--- Running Workbench Voice & Context Tests ---');

// 1. Voice Preservation Principle
console.log('Test 1: Voice Preservation Principle is present and exact...');
assert.ok(
  VOICE_PRESERVATION_PRINCIPLE.includes(
    'improve clarity and readability without replacing the author\'s original thoughts, personality, or perspective'
  ),
  'Voice preservation principle must contain the required phrasing'
);
assert.ok(
  VOICE_PRESERVATION_PRINCIPLE.includes('make the author easier to understand, not to make them sound like someone else'),
  'Voice preservation principle must emphasize authentic identity'
);
console.log('✓ Passed');

// 2. Priority Hierarchy
console.log('Test 2: Priority Hierarchy orders rules correctly...');
assert.ok(PRIORITY_HIERARCHY.includes('1. Factual accuracy and source material'), 'Step 1 must be source factual accuracy');
assert.ok(PRIORITY_HIERARCHY.includes('2. Voice Preservation Principle'), 'Step 2 must be voice preservation');
assert.ok(PRIORITY_HIERARCHY.includes('3. Global Writing Context'), 'Step 3 must be global writing context');
assert.ok(PRIORITY_HIERARCHY.includes('4. Session Directives'), 'Step 4 must be session directives');
assert.ok(PRIORITY_HIERARCHY.includes('5. Platform-specific formatting preferences'), 'Step 5 must be platform formatting');
console.log('✓ Passed');

// 3. Global Writing Context Directives
console.log('Test 3: Global Writing Context directives completeness...');
// Language & Voice
assert.ok(GLOBAL_WRITING_CONTEXT.includes('English, even when source notes or thoughts are in Swedish'), 'Must mandate English');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('curious person sharing real experiences, not an expert lecturing'), 'Must sound curious not expert');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('first person ("I")'), 'Must encourage first person');

// Content & Storytelling
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Share the process, not just the finished result'), 'Must focus on process');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('real challenges, mistakes, experiments, and frustrations'), 'Must embrace friction & frustration');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Do not turn every project into a victory'), 'Must avoid forced victory/lesson');

// Structure
assert.ok(GLOBAL_WRITING_CONTEXT.includes('optional thinking framework, NOT a mandatory article template'), 'Framework must be optional');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Let the source material determine the structure'), 'Material must determine structure');

// Authenticity & Accuracy
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Never invent experiences, tools, materials, results'), 'Must forbid hallucinated tools/materials');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Preserve uncertainty when the author is still experimenting'), 'Must preserve uncertainty');

// What to Avoid
assert.ok(GLOBAL_WRITING_CONTEXT.includes('game-changer'), 'Must forbid AI clichés');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('thrilled to share'), 'Must forbid hype');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Ending every article with a question or a call to action'), 'Must forbid predictable CTA endings');

// Platform Awareness
assert.ok(GLOBAL_WRITING_CONTEXT.includes('Instagram: Conversational, visually relevant captions'), 'Must specify Instagram rules');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('X (Twitter): Short, direct, conversational posts'), 'Must specify X rules');
assert.ok(GLOBAL_WRITING_CONTEXT.includes('under 280 characters'), 'Must enforce X length');
console.log('✓ Passed');

// 4. Instructions Builder in Suggest Mode
console.log('Test 4: buildWorkbenchPromptInstructions in suggest mode...');
const suggestInstructions = buildWorkbenchPromptInstructions({
  mode: 'suggest',
  customInstructions: 'Focus on painting challenges',
  recentPostsContext: '- "Test Post": Some excerpt',
});

assert.ok(suggestInstructions.includes('MODE: SUGGESTIONS GENERATION'), 'Must include suggest mode header');
assert.ok(suggestInstructions.includes('LAYER 4: USER SESSION DIRECTIVES'), 'Must clearly demarcate session directives');
assert.ok(suggestInstructions.includes('Focus on painting challenges'), 'Must embed custom instructions');
assert.ok(suggestInstructions.toLowerCase().includes('never override factual accuracy'), 'Must remind that directives cannot override facts');
assert.ok(suggestInstructions.includes('Test Post'), 'Must include recent posts context to avoid duplicate angles');
console.log('✓ Passed');

// 5. Instructions Builder in Generate Mode
console.log('Test 5: buildWorkbenchPromptInstructions in generate mode...');
const generateInstructions = buildWorkbenchPromptInstructions({
  mode: 'generate',
  suggestionFormat: 'Instagram Caption',
  customInstructions: 'Keep under 150 words',
});

assert.ok(generateInstructions.includes('MODE: DRAFT GENERATION'), 'Must include generate mode header');
assert.ok(generateInstructions.includes('Target Format: Instagram Caption'), 'Must reflect selected format');
assert.ok(generateInstructions.includes('FEW-SHOT EXAMPLES OF AUTHENTIC WRITING'), 'Must include few-shot examples');
assert.ok(generateInstructions.includes('Social Adaptations:'), 'Must instruct social caption generation');
assert.ok(generateInstructions.includes('Clarification Question:'), 'Must instruct clarification question handling');
console.log('✓ Passed');

// 6. Verification of Requirements across Scenarios A-F
console.log('Test 6: Scenarios A-F requirement mapping...');

// Scenario A: Swedish notes -> English blog post
assert.ok(
  GLOBAL_WRITING_CONTEXT.includes('English, even when source notes or thoughts are in Swedish') &&
  GLOBAL_WRITING_CONTEXT.includes('Never invent experiences, tools, materials, results'),
  'Scenario A covered: Swedish -> English without invented techniques'
);

// Scenario B: Short project update
assert.ok(
  GLOBAL_WRITING_CONTEXT.includes('Keep specific details that make the story personal and credible') &&
  GLOBAL_WRITING_CONTEXT.includes('Do not turn every project into a victory, success story, or moral lesson'),
  'Scenario B covered: Concise update without exaggerated conclusions'
);

// Scenario C: Unfinished project
assert.ok(
  GLOBAL_WRITING_CONTEXT.includes('Small observations and unfinished projects are worth sharing') &&
  GLOBAL_WRITING_CONTEXT.includes('Preserve uncertainty when the author is still experimenting or learning'),
  'Scenario C covered: Unfinished project and uncertainty preserved'
);

// Scenario D: Platform adaptation (Instagram & X)
assert.ok(
  GLOBAL_WRITING_CONTEXT.includes('Instagram: Conversational, visually relevant captions') &&
  GLOBAL_WRITING_CONTEXT.includes('X (Twitter): Short, direct, conversational posts'),
  'Scenario D covered: Multi-platform adaptations without hype'
);

// Scenario E: Missing critical context
assert.ok(
  GLOBAL_WRITING_CONTEXT.includes('If essential information is missing, ask one or two focused questions rather than guessing') &&
  GLOBAL_WRITING_CONTEXT.includes('If missing information materially affects accuracy, formulate a focused follow-up question'),
  'Scenario E covered: Focused follow-up question rather than guessing'
);

// Scenario F: Voice preservation with frustration
assert.ok(
  VOICE_PRESERVATION_PRINCIPLE.includes('without replacing the author\'s original thoughts, personality, or perspective') &&
  GLOBAL_WRITING_CONTEXT.includes('Include real challenges, mistakes, experiments, and frustrations when relevant'),
  'Scenario F covered: Frustration, personality, and meaning preserved'
);

console.log('✓ Passed all scenario verifications');

console.log('\nAll 6 test suites passed successfully! 🎉');
