import { GameRunner } from '../src/game-runner';

describe('The test environment', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('should access game', () => {
    expect(GameRunner).toBeDefined();
  });
});
