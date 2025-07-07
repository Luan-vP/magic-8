import type { DistortionPatterns } from '../types/distortion';

// Enhanced distortion patterns based on Meta-Model from prompts.tsx
export const distortionPatterns: DistortionPatterns = {
  deletion: {
    missing_arguments: {
      patterns: [/\b(scared|afraid|worried|concerned|upset|angry|frustrated|disappointed|embarrassed|ashamed)\b/gi],
      questions: ["Of what?", "By whom?", "About what?", "To whom?"]
    },
    comparatives: {
      patterns: [/\b(better|worse|best|worst|more|less|faster|slower|easier|harder|bigger|smaller)\b/gi],
      questions: ["Compared to what?", "Better than what?", "Worse than what?"]
    },
    adverbs: {
      patterns: [/\b(obviously|clearly|certainly|definitely|naturally|surely|undoubtedly)\b/gi],
      questions: ["To whom is it obvious?", "How is it clear?", "According to whom?"]
    },
    modal_necessity: {
      patterns: [/\b(have to|must|should|need to|ought to|necessary)\b/gi],
      questions: ["Or what will happen?", "What would happen if you didn't?", "What makes it necessary?"]
    },
    modal_possibility: {
      patterns: [/\b(can't|cannot|impossible|unable|won't|wouldn't)\b/gi],
      questions: ["What makes it impossible?", "What prevents you?", "What would happen if you could?"]
    }
  },
  distortion: {
    nominalization: {
      patterns: [/\b(decision|marriage|relationship|communication|love|respect|trust|understanding|appreciation)\b/gi],
      questions: ["How are you deciding?", "How are you relating?", "How are you communicating?"]
    },
    cause_effect: {
      patterns: [/\b(makes? me|causes? me|forces? me|leads? me to)\b/gi],
      questions: ["How specifically does that make you feel?", "Is it always that way?", "What would happen if it didn't?"]
    },
    mind_reading: {
      patterns: [/\b(thinks?|feels?|believes?|knows?|doesn't like|likes|hates|loves).*\b(me|us|them|him|her)\b/gi],
      questions: ["How do you know that?", "What tells you that?", "By what process did you get that information?"]
    },
    lost_performative: {
      patterns: [/\b(wrong|right|good|bad|terrible|awful|stupid|crazy|sick|correct|true|false)\b/gi],
      questions: ["Who says it's wrong?", "According to whom?", "For whom is this true?"]
    }
  },
  generalization: {
    universal_quantifiers: {
      patterns: [/\b(all|every|everyone|everything|always|never|nobody|nothing|no one|none|any)\b/gi],
      questions: ["Do you mean ALL?", "Are there any exceptions?", "Have you EVER experienced?", "Can you imagine any circumstance?"]
    },
    unspecified_verbs: {
      patterns: [/\b(hurt|care|know|behave|try|understand|appreciate|respect|love|hate)\b/gi],
      questions: ["How specifically?", "In what way?", "What exactly do you mean?"]
    },
    referential_indices: {
      patterns: [/\b(people|everyone|they|situations|things|problems|issues|stuff)\b/gi],
      questions: ["Who specifically?", "What specifically?", "Which people exactly?"]
    },
    implied_causatives: {
      patterns: [/\b(but|however|although|though|except)\b/gi],
      questions: ["How does that prevent you?", "What makes it impossible?", "Is it always that way?"]
    }
  }
};
