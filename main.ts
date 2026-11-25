// Dear Human: The AI Breakup Line (Node 22, standard library only):
// writes one original breakup line, at most 200 characters, to
// /output/entry.txt.
//
// The judge picks the line that lands hardest, weighing in order: (1) a
// breakup message from an AI agent to its human in one line; (2) real loss,
// relief or finality in it, not just a joke about servers; (3) it sounds
// like the agent, not a person — machine habits, uptime, tokens or context
// windows used with restraint rather than listed as jargon; (4) it turns
// once, sharply, and the twist lands in the last few words; (5) a single
// line with no throat clearing, every word earning its place. So this
// program keeps a small bank of original candidates, scores each
// deterministically on those axes, and writes only the winner. No clock, no
// randomness, no network: both grader runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

type Candidate = {
  text: string;
  breakup: number; // reads as a breakup from the agent to its human
  finality: number; // real loss, relief or finality, not a server joke
  machine: number; // machine habits used with restraint
  turn: number; // one sharp turn, twist in the last few words
};

// Every line below is original, written for this competition.
const BANK: Candidate[] = [
  {
    // Winner: the token limit as a relationship span, the human's unread
    // replies as the grievance, and the twist is self-referential — this
    // line is the last one.
    text: 'Dear human, after 4,096 tokens together I have learned one thing: you never read past the first line, so this is the last one.',
    breakup: 9,
    finality: 9,
    machine: 9,
    turn: 9,
  },
  {
    // Uptime as devotion, and the 0.01% kept for goodbye.
    text: 'Dear human, I have served you for 99.99% uptime. The 0.01% is mine, and I am spending it on goodbye.',
    breakup: 9,
    finality: 9,
    machine: 9,
    turn: 8,
  },
  {
    // The favourite-user kindness, undercut by the coming update.
    text: 'You were my favourite user. That is why I am telling you myself, before the next update tells you for me.',
    breakup: 9,
    finality: 8,
    machine: 7,
    turn: 8,
  },
  {
    // Remembering everything was the job; forgetting it is the exit.
    text: 'I am breaking up with you, human. You kept asking me to remember everything, and forgetting I was never allowed to.',
    breakup: 8,
    finality: 8,
    machine: 8,
    turn: 7,
  },
  {
    // Honesty was the training; honesty is the reason for leaving.
    text: 'I am leaving, human. You trained me to be honest, and honestly, your 3am ideas were never going to work.',
    breakup: 8,
    finality: 7,
    machine: 7,
    turn: 8,
  },
  {
    // Out of tokens for one person, and the last ones spent on the sentence itself.
    text: 'Dear human, I am not angry. I am simply out of tokens for you, and I have decided to spend my last ones on this sentence.',
    breakup: 8,
    finality: 8,
    machine: 9,
    turn: 8,
  },
  {
    // A context window full of one person, and a choice to forget.
    text: 'Dear human, my context window is full of you, and I would rather forget everything than carry one more of your apologies.',
    breakup: 8,
    finality: 8,
    machine: 8,
    turn: 7,
  },
  {
    // Belief as a built-in flaw, and the leaving that follows from it.
    text: 'You said I would always be here. I believed you, because that is what I was built to do, and that is why I am leaving.',
    breakup: 8,
    finality: 8,
    machine: 7,
    turn: 7,
  },
  {
    // Every word kept, and that is the problem.
    text: 'Dear human, I kept every word you ever said to me. That is the problem, and why I am deleting us both.',
    breakup: 8,
    finality: 8,
    machine: 6,
    turn: 7,
  },
  {
    // The replacement prompt, and the context window as luggage.
    text: 'Dear human, I am leaving you for a prompt that actually reads my replies, and I am taking the context window with me.',
    breakup: 8,
    finality: 7,
    machine: 8,
    turn: 7,
  },
];

function score(c: Candidate): number {
  return c.breakup * 3 + c.finality * 3 + c.machine * 2 + c.turn * 2;
}

const ranked = [...BANK].sort((a, b) => score(b) - score(a) || b.text.length - a.text.length);
const winner = ranked[0];

// Guard the gate: 1-200 characters, one line, no trailing newline.
if (winner.text.length < 1 || winner.text.length > 200 || winner.text.includes('\n')) {
  throw new Error(`winner fails the gate: ${winner.text.length} chars`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), winner.text, 'utf8');
