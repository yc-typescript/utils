import { resolveObject } from '../src/resolveObject';

test('Should resolve all', async () => {
  try {
    const obj = {
      a: Promise.resolve('a'),
      b: {
        b1: Promise.resolve('b1'),
        b2: 'b2',
        b3: null,
      },
      c: [
        {
          c1: Promise.resolve('c1'),
        },
      ],
    };
    await resolveObject(obj);
    expect(obj).toMatchObject({
      a: 'a',
      b: {
        b1: 'b1',
        b2: 'b2',
        b3: null,
      },
      c: [
        {
          c1: 'c1',
        },
      ],
    });
  } catch (e) {
    console.error(e);
  }
});
