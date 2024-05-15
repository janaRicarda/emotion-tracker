import Chance from "chance";

const chance = new Chance();

export const emotionData = [
  {
    name: "Joy",
    slug: "joy",
    color: "var(--joy)",
    description:
      "Enjoyment is, for many, the most desirable of the seven universal emotions,typically arising from connection or sensory pleasure. The word happiness and enjoyment can be interchanged, although increasingly people use the word happiness to refer to their overall sense of well-being or evaluation of their lives rather than a particular enjoyment emotion.",
    emotionfunction:
      "As a social function, expressing enjoyment plays an important role in signaling friendliness and assuring that we are not a threat to others. Many emotions scientists agree that enjoyable emotions motivate us to do things that are, by and large, good for us and the survival of our species (i.e., reproducing and child-rearing). Many emotions scientists also agree that the pursuit of enjoyment is a primary motivation in our lives.",
    indications:
      "The most common ways people describe the sensation of happiness is feeling light/uplifted, energetic, buzzing or tingling, warm, or grounded. Depending on the state of your happiness, our posture can be either upright and elevated or still and relaxed.",
    subemotions: [
      "Sensory Pleasure",
      "Rejoicing",
      "Compassion/Joy",
      "Amusement",
      "Schadenfreude",
      "Relief",
      "Peace",
      "Pride",
      "Fiero",
      "Naches",
      "Wonder",
      "Excitement",
      "Ecstasy",
    ],
  },
  {
    name: "Surprise",
    slug: "surprise",
    color: "var(--surprise)",

    description:
      "Surprise is one of the seven universal emotions and arises when we encounter sudden and unexpected sounds or movements. As the briefest of the universal emotions, its function is to focus our attention on determining what is happening and whether or not it is dangerous.",
    emotionfunction:
      "The function of surprise is to focus our attention so we can determine what is happening and whether we are in danger or not.",
    indications:
      "Sensations include a general sense of attentiveness. Moving the head, bringing the hands up to shield the face, and/or stepping backwards away from surprising object.",

    subemotions: [],
  },
  {
    name: "Fear",
    slug: "fear",
    color: "var(--fear)",
    description:
      "Fear is one of the seven universal emotions experienced by everyone around the world. Fear arises with the threat of harm, either physical, emotional, or psychological, real or imagined. While traditionally considered a “negative” emotion, fear actually serves an important role in keeping us safe as it mobilizes us to cope with potential danger. The family of fearful experiences can be distinguished in terms of three factors: Intensity: How severe is the harm that is threatened? Timing: Is the harm immediate or impending? Coping: What, if any, actions can be taken to reduce or eliminate the threat? When we are able to cope with the threat, this lessens or removes the fear. Alternatively, when we are helpless to decrease the threat of harm, this intensifies the fear.",
    emotionfunction:
      "The universal function of fear is to avoid or reduce harm. Depending on what we have learned in the past about what can protect us in dangerous situations, we are capable of doing many things we wouldn’t typically be able, or willing, to do in order to stop the threat. The immediate threat of harm focuses our attention, mobilizing us to cope with the danger. In this way, fear can actually save our lives by forcing us to react without having to think about it (e.g., jumping out of the way of a car coming at us). The evolutionary preset actions of fear include fight, flight and freezing. While traditionally considered a “negative” emotion, fear actually serves an important role in keeping us safe. It can, however, also keep us feeling trapped and prevent us from doing things we’d like to. Whereas some people find fear nearly intolerable and avoid the emotion at all costs, others experience pleasure from feeling fear and seek it out (i.e., watching a horror film). It takes a well-developed capacity for compassion to respect, feel sympathetic toward, and patiently reassure someone who is afraid of something we are not afraid of (most of us dismiss such fears). We do not need to feel another person's fear to accept it and help them cope.",
    indications:
      "Common sensations include feeling cold and shortness of breath. It also may include sweating and trembling or tightening of muscles in the arms and legs. The posture of fear can either be one of mobilizing or immobilizing- freezing or moving away.",
    subemotions: [
      "Trepidation",
      "Nervousness",
      "Anxiety",
      "Dread",
      "Desperation",
      "Panic",
      "Horror",
      "Terror",
    ],
  },

  {
    name: "Sadness",
    slug: "sadness",
    color: "var(--sadness)",
    description:
      "Sadness is one of the seven universal emotions experienced by everyone around the world resulting from the loss of someone or something important. What causes us sadness varies greatly based on personal and cultural notions of loss. While sadness is often considered a “negative” emotion, it serves an important role in signaling a need to receive help or comfort.",
    emotionfunction:
      "The universal function of sadness is to, in some way, signal for help. This can be a signal to others saying that we need comforting, or to ourselves to take some time and recoup from our loss.",
    indications:
      "Common sensations include tightness of the chest, heaviness of the limbs, stinging in the throat, and/or watery eyes. There is often a loss of muscle tone, a lowered or hunched posture, and looking away and/or downwards.",
    subemotions: [
      "Disappointment",
      "Discouragement",
      "Distraughtness",
      "Resignation",
      "Helplessness",
      "Hopelessness",
      "Misery",
      "Despair",
    ],
  },
  {
    name: "Contempt",
    slug: "contempt",
    color: "var(--contempt)",
    description:
      "The least researched of the seven universal emotions, contempt is the feeling of dislike for and superiority (usually morally) over another person, group of people, and/or their actions. It has been accepted by many emotions experts to be a universal emotion, however, some emotions scientists still don’t distinguish contempt as a distinct emotion. Dr. Ekman’s original list of universal emotions, discovered during his groundbreaking research in New Guinea in the 1960s, didn’t include contempt but he later added it after his continued cross-cultural research.",
    emotionfunction:
      "It’s widely believed that the function of contempt is to signal a feeling of superiority, of not needing to accomodate or engage, and to assert power or status.",
    indications:
      "Considering people have a variety of reactions to feeling contempt, the sensations associated with the feeling can be quite different depending on the situation. At times, it may be felt with sensations similar to anger (i.e., tension, heat, etc.) and other times may be felt with enjoyment (i.e., elevated, uplifted, etc.). It can also feel uncomfortable and/or embarrassing to feel. It’s common to “puff up” one’s chest, have upright posture, look “down your nose” at others, and/or roll one’s eyes.",

    subemotions: [],
  },
  {
    name: "Disgust",
    slug: "disgust",
    color: "var(--disgust)",

    description:
      "Disgust is one of the seven universal emotions and arises as a feeling of aversion towards something offensive. We can feel disgusted by something we perceive with our physical senses (sight, smell, touch, sound, taste), by the actions or appearances of people, and even by ideas.",
    emotionfunction:
      "The universal function of disgust is to get away from, block off, or eliminate something offensive, toxic or contaminating.",
    indications:
      "Common sensations include revulsion in the mouth, throat, and/or stomach, and nausea, or physical repulsion (i.e., vomiting). Disgust often leads to physically turning the head or body away from the source of disgust. When disgust leads to nausea, reactions also include covering the nose/mouth and hunching over.",
    subemotions: [
      "Dislike",
      "Aversion",
      "Distate",
      "Repugnance",
      "Revulsion",
      "Abhorremce",
      "Loathing",
    ],
  },
  {
    name: "Anger",
    slug: "anger",
    color: "var(--anger)",
    description:
      "Anger is one of the seven universal emotions which arises when we are blocked from pursuing a goal and/or treated unfairly. At its most extreme, anger can be one of the most dangerous emotions because of its potential connection to violence and, therefore, is a common emotion to seek help in dealing with.",
    emotionfunction:
      "Anger easily causes harm to ourselves and others. Psychologists are unclear about whether the wish to harm is built into the core of anger or if it is something we learn, but we know it often is a part of the anger process that gets us into trouble. In both psychological and contemplative traditions, it is acknowledged that anger can be useful when it’s motivated by compassion and expressed with discernment. However, because anger can easily initiate a cycle of violence, one has to be very honest and clear in one’s assessment to determine whether or not it’s constructive anger.",
    indications:
      "Typical sensations include: feeling hot, (hence the term “seeing red”), sweating, muscle tension, and clenching one’s jaw and/or fists. Most people find themselves leaning forward with their head/chin jutting forward and puffing their chest/body to appear larger.",
    subemotions: [
      "Annoyance",
      "Frustration",
      "Exasperation",
      "Argumantativeness",
      "Bitterness",
      "Vengefulness",
      "Fury",
    ],
  },
];
export const exampleData = [
  {
    emotion: "Joy",
    stories: [
      {
        emotion: "Joy",
        subemotion: "Relief",
        tensionLevel: "low",
        category: chance.integer({ min: 60, max: 100 }),
        trigger: "The code works",
        notes: "Finally, the code really works!",
      },
      {
        emotion: "Joy",
        subemotion: "Ecstacy",
        tensionLevel: "high",
        category: chance.integer({ min: 80, max: 100 }),
        trigger: "Met someone REALLY nice!",
        notes: "This person is REALLY, REALLY nice. I'm so excited",
      },
      {
        emotion: "Joy",
        subemotion: "Pride",
        tensionLevel: "mid",
        category: chance.integer({ min: 70, max: 100 }),
        trigger: "Got promoted.",
        notes: "The boss knows my work is good.",
      },
    ],
  },
  {
    emotion: "Surprise",
    stories: [
      {
        emotion: "Surprise",
        subemotion: "None",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 40 }),
        trigger: "The code doesn't work ",
        notes: "Was sure it would work. Surprise, it does not.",
      },
      {
        emotion: "Surprise",
        subemotion: "None",
        tensionLevel: "mid",
        category: chance.integer({ min: 40, max: 60 }),
        trigger: "Met someone I did not expect to show up around here.",
        notes: "Haven't seen this guy for a while.",
      },
      {
        emotion: "Surprise",
        subemotion: "None",
        tensionLevel: "low",
        category: chance.integer({ min: 80, max: 100 }),
        trigger: "Unexpected gift",
        notes: "What a nice surprise!",
      },
    ],
  },

  {
    emotion: "Fear",
    stories: [
      {
        emotion: "Fear",
        subemotion: "Anxiety",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 30 }),
        trigger: "Will the code finally work?",
        notes: "Damn that user story.",
      },
      {
        emotion: "Fear",
        subemotion: "Nervousness",
        tensionLevel: "mid",
        category: chance.integer({ min: 10, max: 40 }),
        trigger: "Will my code work?",
        notes: "I'm nervous.",
      },
      {
        emotion: "Fear",
        subemotion: "Dread",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 20 }),
        trigger: "Saw a zombie.",
        notes: "Dreadful thing!",
      },
    ],
  },

  {
    emotion: "Anger",
    stories: [
      {
        emotion: "Anger",
        subemotion: "Fury",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 35 }),
        trigger: "The code doesn't effin work ",
        notes: "Damn that user story",
      },
      {
        emotion: "Anger",
        subemotion: "Annoyance",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 37 }),
        trigger: "Met someone REALLY annoying!",
        notes: "I can't stand that person.",
      },
      {
        emotion: "Anger",
        subemotion: "Vengefullness",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 70 }),
        trigger: "Some idiot demolished my bike.",
        notes:
          "Someone has to pay the price. Wait til I find your bike, you little xxx.",
      },
    ],
  },

  {
    emotion: "Sadness",
    stories: [
      {
        emotion: "Sadness",
        subemotion: "Disappointment",
        tensionLevel: "mid",
        category: chance.integer({ min: 0, max: 32 }),
        trigger: "The code does not work",
        notes: "Bummer.",
      },
      {
        emotion: "Sadness",
        subemotion: "Resignation",
        tensionLevel: "low",
        category: chance.integer({ min: 0, max: 25 }),
        trigger: "The code does not work",
        notes: "It will never work.",
      },
      {
        emotion: "Sadness",
        subemotion: "Misery",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 20 }),
        trigger: "Had a fight with my best friend.",
        notes: "We fought so hard I had to cry. I'm miserable now.",
      },
      {
        emotion: "Sadness",
        subemotion: "Despair",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 25 }),
        trigger: "No promotion as expected.",
        notes:
          "How could I ever convince my boss that I deserve this promotion?",
      },
    ],
  },
  {
    emotion: "Contempt",
    stories: [
      {
        emotion: "Contempt",
        subemotion: "None",
        tensionLevel: "high",
        category: chance.integer({ min: 10, max: 40 }),
        trigger: "Your code is inferior to mine, so why bragg about it?",
        notes: "Losers should not write code.",
      },
      {
        emotion: "Contempt",
        subemotion: "None",
        tensionLevel: "high",
        category: chance.integer({ min: 40, max: 60 }),
        trigger: "Met some upstart and showed that person who's boss.",
        notes: "I am the pro here.",
      },
      {
        emotion: "Contempt",
        subemotion: "None",
        tensionLevel: "high",
        category: chance.integer({ min: 20, max: 50 }),
        trigger: "Had a fight with my neighbour.",
        notes: "Mr Annoying Neighbour, who do you think your are?",
      },
    ],
  },
  {
    emotion: "Disgust",
    stories: [
      {
        emotion: "Disgust",
        subemotion: "Revulsion",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 35 }),
        trigger: "Ate a raw slug.",
        notes: "Ugh, slimy!",
      },
      {
        emotion: "Disgust",
        subemotion: "Dislike",
        tensionLevel: "low",
        category: chance.integer({ min: 20, max: 40 }),
        trigger: "Drank a beer that was not properly cooled.",
        notes: "Don't like my beer warm.",
      },
      {
        emotion: "Disgust",
        subemotion: "Loathing",
        tensionLevel: "high",
        category: chance.integer({ min: 0, max: 33 }),
        trigger: "Made a trip through bat country.",
        notes: "Let's kill all these little bloodsuckers.",
      },

export const manualData = [
  {
    question: "How can I make a new entry?",
    answers: [
      "Upon launching the app, you'll be prompted to make a new entry.",
      "Start by assessing your level of tension on a scale from 0 to 100.",
      "Choose whether you'd like to conclude your entry there or delve deeper into your emotions.",
      "If you opt to continue, you'll be asked to select the basic emotion closest to what you're feeling from the following options: joy, surprise, fear, sadness, contempt, disgust or anger.",
      "Once you've made your selection, you'll proceed to a questionnaire where you can assign a sub-emotion to your feeling.",
      "Classify whether your feeling is perceived as negative, neutral, or positive.",
      "Optionally, you can provide details about triggers or additional notes.",
      "After completing the questionnaire, save your entry.",
    ],
  },
  {
    question: "What if my entry was wrong?",
    text: "If you feel that your entry was incorrect or want to make changes, you can edit or delete it.",
    answers: [
      "You can navigate through the app by clicking on the burger menu in the top right corner.",
      "Click on „emotion records“ to go to your Emotion Records List.",
      "Simply locate the entry in your Emotion Records List, tap on the pencil Icon to edit, or tap the trashcan Icon to delete it.",
      "For safety-reasons you will be asked to confirm your decision before changing your data.",
      "Please note that there is no option to restore your entries once they’re deleted.",
    ],
  },
  {
    question: "How to answer the question?",
    answers: [
      "When answering the question about which basic emotion your feeling resembles the most, choose the one that closely aligns with your current emotional state.",
      "Be honest and select the emotion that best describes your feelings at the moment.",
      "If you're unsure, take a moment to reflect on your emotions before making your choice.",
      "If needed you can get more information about the 7 basic emotions. Therefor simply go to the 7 basic emotions via the burger menu.",
      "The 7 basic emotions show up as a list and you can click on any of the emotions to get more details.",
      "Through the next and previous buttons on the side, you can click yourself through all of the emotions without returning to the emotions list all the time.",
    ],
  },
];
