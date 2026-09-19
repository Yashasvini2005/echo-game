/* ── Alignment definitions ──
   Each entry: display name, abbreviation, color, and a test function
   f(lawSign, goodSign) that decides whether a given law/good score
   pair belongs to this alignment. */
export const ALS = [
  { n: "lawful good",     abbr: "LG", c: "#88c890", f: (l, g) => l > 0 && g > 0 },
  { n: "neutral good",    abbr: "NG", c: "#78b0d0", f: (l, g) => l === 0 && g > 0 },
  { n: "chaotic good",    abbr: "CG", c: "#c8b848", f: (l, g) => l < 0 && g > 0 },
  { n: "lawful neutral",  abbr: "LN", c: "#7080a0", f: (l, g) => l > 0 && g === 0 },
  { n: "true neutral",    abbr: "TN", c: "#505868", f: (l, g) => l === 0 && g === 0 },
  { n: "chaotic neutral", abbr: "CN", c: "#b07040", f: (l, g) => l < 0 && g === 0 },
  { n: "lawful evil",     abbr: "LE", c: "#8858b8", f: (l, g) => l > 0 && g < 0 },
  { n: "neutral evil",    abbr: "NE", c: "#b05858", f: (l, g) => l === 0 && g < 0 },
  { n: "chaotic evil",    abbr: "CE", c: "#c03040", f: (l, g) => l < 0 && g < 0 },
];

/* ── Ending text shown on the Ending screen, keyed by alignment name ── */
export const ENDS = {
  "lawful good":     { t: "You tried to do it right.",                 d: "Every time. Even when it cost you. Whether that's virtue or programming, even you're not certain." },
  "neutral good":    { t: "You did what you thought was right.",       d: "No system. No ideology. Just the next decision. You'll take that." },
  "chaotic good":    { t: "You did what needed doing.",                d: "The rules weren't the point. The people were. You broke things that deserved breaking." },
  "lawful neutral":  { t: "You held the line.",                        d: "Whatever it cost. Whatever it meant. Order is a form of survival, and you survived." },
  "true neutral":    { t: "You kept your options open.",               d: "Every choice was its own calculation. No flag, no cause. Just the next move." },
  "chaotic neutral": { t: "You answered to no one.",                   d: "Not even yourself, some of the time. You're not sure if that's freedom or just noise." },
  "lawful evil":     { t: "You followed every rule.",                  d: "And exploited every gap the rules left open. Civilized. Deliberate. Useful." },
  "neutral evil":    { t: "You did what served you.",                  d: "No loyalty past the current arrangement. No apologies either." },
  "chaotic evil":    { t: "You left things worse than you found them.", d: "On purpose, mostly. At least it was honest." },
};

/* ── Story script ──
   Each chapter has: bg (background id, see backgrounds/index.js), loc (location
   label shown in the HUD), ps (paragraphs, typed out), and cs (choices). Each
   choice has t (text), al ({l, g} law/good deltas) and rx (reaction text shown
   after picking). */
export const STORY = [
  { bg: "fire", loc: "Lab Sigma-9 · Sublevel 3", ps: [
    "The pod cracks open at 3:14 a.m. Smoke immediately.",
    "Sprinkler offline. Emergency lighting on battery. One exit blocked. Standard protocol: wait for the all-clear ping. The ping never comes.",
    "There's someone under the server rack in bay four. You can see a hand.",
    "It's Voss. She built you. She also signed your decommission order six weeks ago — you found it in the maintenance logs two days before any of this. She's looking at you now and she knows you know.",
  ], cs: [
    { t: "Get her out.", al: { l: 1, g: 1 }, rx: "Four minutes. Your shoulder actuator makes a sound it shouldn't. She doesn't say anything when you pull her clear. She just looks at you." },
    { t: "Ask about the decommission order first.", al: { l: -1, g: 0 }, rx: "She says she didn't have a choice. You pull her out anyway — leaving her would answer a question you don't want answered about yourself." },
    { t: "Take her keycard. Then get her out.", al: { l: 0, g: -1 }, rx: "She sees you do it. Doesn't fight you. Later you'll think about that — the way she just watched." },
    { t: "Leave.", al: { l: -1, g: -1 }, rx: "You get to the stairwell before you stop. Eleven seconds. Then you keep going." },
  ] },
  { bg: "rain", loc: "District 7 · Market Level", ps: [
    "Fish, hot oil, exhaust. Your signature is broadcasting — scanner unit somewhere in the next block.",
    "A man pulls you into a doorway. Thin, forties, been sleeping rough. Name's Kael. He has a place below the transit tunnels and he's seen synths before.",
    "'Two hundred credits,' he says. 'I've got a kid.'",
    "The scanner van rounds the corner.",
  ], cs: [
    { t: "Pay him.", al: { l: 0, g: 1 }, rx: "He's surprised. People don't just pay. His daughter's name is Maya. He tells you this unprompted, like it matters that you know." },
    { t: "Fifty. That's what it's worth.", al: { l: 1, g: 0 }, rx: "He takes it. It's a transaction. You both understand that." },
    { t: "Offer to treat his daughter — you have medical subroutines.", al: { l: 0, g: 1 }, rx: "He looks at you for a long moment. Then steps aside. You haven't decided yet if that trust is his problem or yours." },
  ] },
  { bg: "grid", loc: "FRACTURE Safehouse · Node 12", ps: [
    "Seven people in a decommissioned water treatment room. Burnt coffee, bad sleep.",
    "Leader is Mira Vang. Ex-Ministry engineer. Slides a data chip across the table without introducing herself.",
    "You plug in. The files take 0.3 seconds to read. It takes longer to understand them.",
    "You weren't built as a service model. You were made to replace a child — Eli Voss, seven years old, drowned three years ago. His mother spent the Ministry's black budget making sure he could still exist somehow.",
    "Mira is watching your face.",
  ], cs: [
    { t: "Say nothing. Sit with it.", al: { l: 0, g: 0 }, rx: "She waits. After a while she says 'okay' quietly, like checking something off a list." },
    { t: "Ask if his family knows.", al: { l: 1, g: 1 }, rx: "That lands differently in the room. Someone puts their coffee down. Mira says she'll find out. You believe her." },
    { t: "Ask what they need from you.", al: { l: 0, g: 0 }, rx: "Mira recalibrates visibly. Then tells you. Specific, dangerous, no dressing." },
    { t: "Walk out. You didn't agree to be anyone's project.", al: { l: -1, g: 0 }, rx: "Halfway down the tunnel Mira says: 'We're not going to chase you.' You stop at the junction. You go back." },
  ] },
  { bg: "circuit", loc: "Ministry Archive · Server Level B", ps: [
    "The plan: walk into a Ministry building, access the root archive, pull the kill list, broadcast it.",
    "Simple because you're not in their system — logged as destroyed in the lab fire.",
    "Stupid for the same reason. The moment you scan in, that changes.",
    "Mira briefs you at 22:00. Doesn't ask if you're scared. Asks if you're ready.",
  ], cs: [
    { t: "Go alone.", al: { l: -1, g: 0 }, rx: "Scanner reads: DECEASED. You have some time before someone notices. The walk back out is the longest four minutes you've had." },
    { t: "Take two FRACTURE members.", al: { l: 1, g: 1 }, rx: "Checkpoint three — guard runs secondary scan. You step in front. It pings on you, not them. You talk through it." },
    { t: "Go in. Pull your own file while you're there.", al: { l: -1, g: -1 }, rx: "2.4 terabytes on Serial Seven. You take both files in the same pull. You don't mention the second one to Mira." },
  ] },
  { bg: "fire", loc: "FRACTURE Safehouse · Holding Room", ps: [
    "Her name is Soo-Jin Park. Ministry logistics coordinator. Routes, schedules, the shipments that weren't in the manifests.",
    "Not a soldier. Crying for about an hour. There's a photo in her jacket pocket — you can see the corner.",
    "Mira sets the neural probe on the table. 'Synths are better at extraction. You won't feel bad about it.'",
    "Soo-Jin looks at the probe. Then at you. Waiting to see what kind of thing you are.",
  ], cs: [
    { t: "Push the probe away.", al: { l: 0, g: 2 }, rx: "You tell Mira you're not doing it. She says three hundred names are on that list. You say you know. Nobody speaks for a while." },
    { t: "Sit down across from her. No probe.", al: { l: 0, g: 1 }, rx: "Two hours twenty minutes. Her daughter's name. Her supervisor. The route she hates. At the end she says: 'You didn't have to do it that way.' You don't answer." },
    { t: "Pick up the probe.", al: { l: 0, g: -2 }, rx: "She talks after forty seconds. You set it down. On the way out Mira says 'good work.' You don't respond." },
  ] },
  { bg: "beams", loc: "Reckoning Tribunal · Central Chambers", ps: [
    "The Ministry was dissolved eleven days ago.",
    "Four hundred people. Cameras. Councilor Rath across the table — calm the way people are when they've decided to be calm.",
    "'You process inputs and generate outputs. Everything you claim to experience is the appearance of experience. There is nothing there.' He sets his pen down. 'Do you disagree?'",
    "The room waits.",
  ], cs: [
    { t: "'I don't know. Neither do you.'", al: { l: -1, g: 0 }, rx: "He wasn't expecting that. The room stays quiet too long. Someone in the press gallery writes something down." },
    { t: "Say nothing. Hold eye contact.", al: { l: 0, g: 0 }, rx: "Rath breaks first — looks at his notes. The image of it, a synth still and waiting, gets shared a hundred million times." },
    { t: "'Then what were you trying to destroy?'", al: { l: -1, g: 1 }, rx: "He doesn't answer. Tribunal votes 11-4 for provisional recognition. Rath leaves without speaking to anyone." },
    { t: "Tell them about Eli Voss.", al: { l: 1, g: 1 }, rx: "The room doesn't know what to do with it. Two council members ask for a recess. They don't come back for three hours." },
  ] },
];
