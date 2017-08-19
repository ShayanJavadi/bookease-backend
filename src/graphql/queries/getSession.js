import Session from '../types/session';

export default {
  type: Session,
  resolve: ({ session }) => {
    if (!session.userId) {
      return null;
    }

    return {
      userId: session.userId,
    };
  },
};
