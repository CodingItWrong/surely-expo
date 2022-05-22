const isJestTest = process.env.NODE_ENV === 'test';

export default function logError(error) {
  if (!isJestTest) {
    console.error(error);
  }
}
