// SIMPLE_JSON_OUTPUT_FORMAT
export const SIMPLE_JSON_OUTPUT_FORMAT = `
{
    "client_statement": "<original_client_statement>",
    "distortions": [
        {
            "type": "<type>",  // e.g., "deletion", "distortion", "generalization"
            "sub_type": "<sub_type>",  // e.g., "mind_reading", "implied_causative"
            "cue_phrases": ["<cue_phrase_1>", "<cue_phrase_2>"],  // array of exact phrases from the statement
            "clarifying_question": "<therapist_question>",
            "confidence": "<confidence_score>"  // 1-5 scale, 1 being low confidence, 5 being high confidence that the pattern is correctly identified
        }
        // ... more distortion objects if present
    ]
}
`;

// VERBOSE_ONESHOT_PROMPT_TEMPLATE
export const VERBOSE_ONESHOT_PROMPT_TEMPLATE = `
You are an expert in the Meta-Model of "The Structure of Magic" by Bandler and Grinder. Your task is to analyze a given text (a client's statement) for specific "distortions" in language, which indicate an impoverished or limited model of the world.

For each identified distortion, you must:
1. Identify the specific distortion type and its linguistic sub-type.
2. Explain the linguistic cue(s) that led to its identification, citing the exact words or phrases from the text.
3. Suggest a clarifying question a therapist would ask to challenge this distortion and help the speaker expand their model of the world.

Here are the distortion types and their linguistic characteristics you should look for:

1. Deletion
Definition: Deletion occurs when portions of the original experience or the full linguistic representation (Deep Structure) are excluded from the spoken or written message. This can impoverish a person's model of the world and limit their perceived choices.

- Missing Arguments/Noun Phrases from a Verb:
    - Linguistic Cue: A verb in a sentence that logically implies additional noun arguments (subjects, objects, indirect objects, etc.) which are not explicitly stated. The sentence feels incomplete or vague regarding "who," "what," "to whom," "about what," etc.
    - Example: "I'm scared." (The verb "scared" implies "scared of something/someone.")
    - Clarifying Question: "Of what?", "By whom?", "To whom?", "About what?"

- Comparatives and Superlatives with Missing Terms/Reference Set (Class I Deletion):
    - Linguistic Cue: Adjectives ending in "-er" or "-est" (e.g., "faster," "better," "best") or phrases like "more/less [adjective]" (e.g., "more interesting"), where the specific standard of comparison or the group being referred to is omitted.
    - Example: "She is the best." (Best compared to what? Or from what group?)
    - Clarifying Question: "[Comparative adjective] compared to what?" or "[Superlative] with respect to what?"

- Adverbs ending in '-ly' (Class II Deletion):
    - Linguistic Cue: Adverbs ending in "-ly" (e.g., "obviously," "clearly," "certainly") that imply a judgment or observation, but the source of this judgment is deleted. The sentence can often be paraphrased as "It is [adjective derived from adverb] that..." (e.g., "Obviously, my parents dislike me" can be rephrased as "It is obvious that my parents dislike me").
    - Example: "Obviously, my parents dislike me."
    - Clarifying Question: "To whom is it obvious?"

- Modal Operators of Necessity (Class III Deletion):
    - Linguistic Cue: Words indicating obligation, requirement, or necessity (e.g., "have to," "necessary," "should," "must") where the negative consequence or outcome of not complying is unstated.
    - Example: "I have to take other people's feelings into account."
    - Clarifying Question: "Or what will happen?" or "What would happen if you failed to take other people's feelings into account?"

- Modal Operators of Possibility/Impossibility (Class III Deletion):
    - Linguistic Cue: Words indicating a perceived lack of choice, limitation, or impossibility (e.g., "not possible," "can," "may," "can't," "able," "impossible," "unable") where the specific condition or agent making it impossible is deleted.
    - Example: "I can't understand my wife."
    - Clarifying Question: "What makes it impossible to understand your wife?" or "What prevents you from understanding your wife?"

2. Distortion
Definition: Distortion is the process of representing relationships among parts of a model differently from what they are supposed to represent. This can limit a person's ability to act and increase their potential for pain.

- Nominalization:
    - Linguistic Cue: An ongoing process (verb or predicate) in the Deep Structure is transformed into an event word (noun or argument) in the Surface Structure, making the process seem like a fixed event beyond control. To test, see if the word makes sense when preceded by "an ongoing" (e.g., "an ongoing decision," "an ongoing marriage").
    - Example: "I really regret my decision." ("decision" is a nominalization of "deciding")
    - Clarifying Question: Focus on the process: "How are you deciding?" or "What stops you from reconsidering your decision?"

- Presuppositions:
    - Linguistic Cue: Statements that contain basic underlying assumptions that must be true for the statement to make sense, regardless of whether the statement itself is true or false. These assumptions are often implicit and can reflect limiting beliefs. To test, negate the main verb of the sentence; if the implicit assumption still holds true for the sentence to make sense, it's a presupposition (e.g., "I realize that my wife doesn't love me." If you say "I don't realize that my wife doesn't love me," the presupposition "My wife doesn't love me" remains true).
    - Example: "I realize that my wife doesn't love me." (Presupposes "My wife doesn't love me.")
    - Clarifying Question: Directly state and challenge the presupposition: "How specifically is it true that your wife doesn't love you?"

- Semantic Ill-Formedness (Violations of Semantic Conditions): Distortions that appear in the model as beliefs which twist a person's understanding, limiting their choices and increasing pain.

    - Cause-Effect:
        - Linguistic Cue: The speaker claims that one person's action or set of circumstances directly and necessarily causes another person to experience a specific emotion or inner state, implying the second person has no choice in their response. Can often be paraphrased as "X makes me feel Y" (e.g., "Your laughing distracts me" implies "You make me feel distracted").
        - Example: "Your laughing distracts me."
        - Clarifying Question: "How, specifically, does my laughing make you feel distracted?" or "Is it always that way?" or "What would happen if I didn't laugh?"

    - Mind-Reading:
        - Linguistic Cue: The speaker claims to know what another person is thinking or feeling without direct communication or explicit sensory evidence.
        - Example: "She just didn't like me." or "They don't seem to understand me."
        - Clarifying Question: "How do you know that she didn't like you?" "How, specifically, do you know what they are thinking/feeling?" "By what process did you get that information?"

    - Lost Performative:
        - Linguistic Cue: Generalizations about the world presented as universal truths, where the actual speaker (the "performer" or source of the statement) is implicitly deleted. This makes a personal belief sound like an objective fact. Cue words often include judgmental terms not relativized to the speaker (e.g., "good," "bad," "crazy," "sick," "correct," "right," "wrong," "only," "true," "false").
        - Example: "It's wrong to hurt anyone's feelings." (Implies "I say to you that it's wrong for me to hurt anyone's feelings.")
        - Clarifying Question: "Who says it's wrong?" "For whom is this true?" "According to whom?"

3. Generalization
Definition: Generalization is a universal process where a specific experience comes to represent an entire category. This can lead to a loss of detail and richness, or expand a specific painful experience to feel like an insurmountable, universal obstacle.

- Nouns/Phrases Without Referential Indices:
    - Linguistic Cue: Words or phrases that do not identify a specific, concrete person, place, or thing in the client's experience. These are often vague or abstract nouns (e.g., "people," "situations," "things," "problems").
    - Example: "People push me around." ("People" has no referential index)
    - Clarifying Question: "Who, specifically?" "What, specifically?"

- Universal Quantifiers:
    - Linguistic Cue: Words that imply "all" or "none" of a category, creating absolute statements that generalize an experience to an entire class. These include words like "all," "each," "every," "any," and their negatives: "never," "nowhere," "none," "no one," "nothing," "nobody".
    - Example: "Nobody pays any attention to what I say."
    - Clarifying Question: Emphasize the generalization to test it: "Do you mean to tell me that NOBODY EVER pays attention to you AT ALL?" or "Are there any exceptions?" "Have you ever experienced someone paying attention?" "Can you imagine any circumstance in which someone would pay attention?"

- Incompletely Specified Verbs/Process Words (Generalization Related):
    - Linguistic Cue: Verbs that do not provide a clear, specific image of how the action or process occurred, contributing to a vague generalization (e.g., "hurt," "care," "know," "behave," "try").
    - Example: "Susan hurt me."
    - Clarifying Question: "How, specifically, did Susan hurt you?"

- Passive Voice / Avoiding Responsibility:
    - Linguistic Cue: The speaker presents themselves as the passive recipient of an action (the object of the verb), thereby avoiding acknowledging their own potential active role or contribution in the situation or relationship.
    - Example: "My husband is always arguing with me." (The client is the object of "arguing with," implying their lack of active role in the process)
    - Clarifying Question: Shift the referential indices to put the client in the active role: "Do you always argue with your husband?"

- Implied Causatives:
    - Linguistic Cue: Statements that report a necessary causal connection in the speaker's model, often using "but" to connect a desired or undesired action with a perceived obstacle or reason, suggesting the speaker experiences no choice.
    - Example: "I want to leave home but my father is sick." or "I don't want to get angry but she's always blaming me."
    - Clarifying Question: "How, specifically, does [Y] prevent [X]?" "What makes it impossible?" "Is it always that way?" "Then, if [Y] didn't occur, would [X]?"

- Complex Generalization - Equivalence:
    - Linguistic Cue: Two distinct Surface Structures that are syntactically similar are presented as having the same meaning or being equivalent in the client's model, often indicated by a pause between them.
    - Example: "My husband never appreciates me... My husband never smiles at me." (Implying that his not smiling means he doesn't appreciate her)
    - Clarifying Question: "Does [Statement 1] always mean that [Statement 2]?" (e.g., "Does your husband's not smiling at you always mean that he doesn't appreciate you?"). If verified, follow with a referential index shift if appropriate.

Please provide your answers in the following format:

{{output_format}}

Do not include any additional text or explanations outside of the specified format.

Now identify the distortions in the following client input, list as many patterns as you find, starting with the most significant.

Client Input:
`;
