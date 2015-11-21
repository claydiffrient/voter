export default function (thinky) {
  const { type } = thinky;

  /**
   * Model representing a list which contains items that
   * can be voted on.
   */
  let Item = thinky.createModel('items', {
    id: type.string(),
    ownerId: type.string(),
    listId: type.string(),
    title: type.string().required(),
    votes: type.number().integer().default(0)
  });

  return Item;

};
