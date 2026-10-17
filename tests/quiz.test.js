// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  createQuiz,
  answerQuestion,
  advanceQuestion,
  isQuizFinished,
  shuffle,
  isCorrect,
  calculatePercentage,
  getGrade,
  formatTimeLeft,
  getFeedbackMessage,
} = require("../src/quiz.js");

test("createQuiz initializes a fresh quiz state", () => {
  const questions = [{ answer: 1 }];
  const state = createQuiz(questions);

  assert.deepEqual(state, { questions, current: 0, score: 0, answered: false });
  assert.notEqual(state, questions);
});

test("answerQuestion marks a correct answer and returns a new state", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 0, answered: false };
  const result = answerQuestion(state, 1);

  assert.deepEqual(result, {
    state: { ...state, score: 1, answered: true },
    correct: true,
  });
  assert.deepEqual(state, { questions: [{ answer: 1 }], current: 0, score: 0, answered: false });
  assert.notEqual(result.state, state);
});

test("answerQuestion leaves the score unchanged for an incorrect answer", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 2, answered: false };
  const result = answerQuestion(state, 0);

  assert.equal(result.correct, false);
  assert.equal(result.state.score, 2);
  assert.equal(result.state.answered, true);
  assert.equal(state.answered, false);
});

test("advanceQuestion returns a new state at the next unanswered question", () => {
  const state = { questions: [{ answer: 1 }], current: 0, score: 1, answered: true };
  const nextState = advanceQuestion(state);

  assert.deepEqual(nextState, { ...state, current: 1, answered: false });
  assert.equal(state.current, 0);
});

test("isQuizFinished reports whether the current index is past the questions", () => {
  const state = createQuiz([{ answer: 0 }]);

  assert.equal(isQuizFinished(state), false);
  assert.equal(isQuizFinished(advanceQuestion(state)), true);
  assert.equal(isQuizFinished(createQuiz([])), true);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade returns the expected grade at each threshold", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(50), "C");
});

test("getGrade assigns scores below each threshold to the next lower grade", () => {
  assert.equal(getGrade(89), "B");
  assert.equal(getGrade(74), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns feedback for each grade", () => {
  assert.equal(getFeedbackMessage("A"), "Excellent work!");
  assert.equal(getFeedbackMessage("B"), "Good job!");
  assert.equal(getFeedbackMessage("C"), "You can do better!");
  assert.equal(getFeedbackMessage("Keep practicing"), "Keep practicing!");
});

test("formatTimeLeft shows the remaining seconds", () => {
  assert.equal(formatTimeLeft(12), "⏱ 12s");
});

test("formatTimeLeft shows the warning boundary", () => {
  assert.equal(formatTimeLeft(5), "⏱ 5s");
});

test("formatTimeLeft shows zero seconds", () => {
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});
