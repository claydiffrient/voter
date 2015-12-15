export default function (thinky) {

  const { type } = thinky;

  /**
   * Model representing a vote which contains a userId
   * for the person who entered the vote
   */
  const Vote = thinky.createModel('votes', {
    id: type.string(),
    voterId: type.string(),
    itemId: type.string()
  });

  return Vote;
};
