import * as jwt from 'jsonwebtoken';
const APP_SECRET = 'StartLord';

export default {
  APP_SECRET,
  getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '')
      const {
        userId
      } = jwt.verify(token, APP_SECRET)
      return userId
    }

    throw new Error('Not authenticated')
  }
}
