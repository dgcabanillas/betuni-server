const { users, bets } = require("../common/sharedVariables");

exports.findOne = async (model, query, mock = true) => {
  if (mock) {
    const { where } = query;
    const { username } = where;
    return users.find((u) => u.username == username);
  }
  return model.findOne(query);
};

exports.create = async (model, body, mock = true) => {
  if (mock) {
    if (model.name == "User") {
        const createdUser = model.build({
          id: users.length + 1,
          ...body,
        });
        users.push({
          id: users.length + 1,
          ...body,
          balance: 0
        });
        return createdUser;
    } else if (model.name == "Bet") {
        bets.push({id: bets.length + 1, ...body});
    }
  }
  return model.create(body);
};

exports.findByPk = async (model, id, mock = true) => {
  if (mock) {
    const user = users.find((u) => u.id == id);
    user.save = save
    return user
  }
  return model.findByPk(id);
};

async function save() {
    return true
}