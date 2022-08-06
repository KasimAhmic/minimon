import { MinimonConfigSchema } from './config.schema';

describe('Config Schema', () => {
  it('succeeds', () => {
    const result = MinimonConfigSchema.validate({
      HOST: 'testing',
      PORT: 1234,
    });

    expect(result.error).toBeUndefined();
  });

  it('fails', () => {
    const result = MinimonConfigSchema.validate({
      HOST: 123456,
      PORT: 'testing',
    });

    expect(result.error).toBeDefined();
  });
});
