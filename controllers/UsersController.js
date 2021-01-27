import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) return response.status(400).send({ error: 'Missing email' });
    if (!password) return response.status(400).send({ error: 'Missing password' });

    const emailExists = await dbClient.users.findOne({ email });
    if (emailExists) return response.status(400).send({ error: 'Already exist' });

    const sha1Password = sha1(password);
    const result = await dbClient.usersnsertOne({
      email,
      password: sha1Password,
    });
    const user = {
      id: result.insertedId,
      email,
    };
    return response.status(201).send(user);
  }
}
