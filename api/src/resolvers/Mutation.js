import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import utils from '../utils';

const APP_SECRET = utils.APP_SECRET;

export default {
  post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
          postedBy: {
            connect: {
              id: userId
            }
          },
        },
      },
      info,
    )
  },
  async signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
    // 2
    const user = await context.db.mutation.createUser({
      data: { ...args,
        password
      },
    }, `{ id }`)

    // 3
    const token = jwt.sign({
      userId: user.id
    }, APP_SECRET)

    // 4
    return {
      token,
      user,
    }
  },
  async login(parent, args, context, info) {
    // 1
    const user = await context.db.query.user({
      where: {
        email: args.email
      }
    }, ` { id password } `)
    if (!user) {
      throw new Error('No such user found')
    }

    // 2
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({
      userId: user.id
    }, APP_SECRET)

    // 3
    return {
      token,
      user,
    }
  }
}
