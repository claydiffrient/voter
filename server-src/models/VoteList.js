export default function (thinky) {

  const { type } = thinky;

  /**
   * Model representing a list which contains items that
   * can be voted on.
   */
  let VoteList = thinky.createModel('votelists', {
    id: type.string(),
    ownerId: type.string()
  });

  return VoteList;
};
