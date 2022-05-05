import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

describe('Submit feedback', () => {
  const feedbackRepositoruSpies = jest.fn();
  const mailAdapterSpies = jest.fn();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    { create: feedbackRepositoruSpies },
    { sendMail: mailAdapterSpies }
  );

  it('Should execute with success', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Está tudo errado!',
        screenshot: 'data:image/png;base64,euheuheusadsdsdsaa',
      })
    ).resolves.not.toThrow();

    expect(feedbackRepositoruSpies).toHaveBeenCalled();
    expect(mailAdapterSpies).toHaveBeenCalled();
  });

  it('Should not allow feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'Está tudo errado!',
        screenshot: 'data:image/png;base64,euheuheusadsdsdsaa',
      })
    ).rejects.toThrow();
  });

  it('Should not allow feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,euheuheusadsdsdsaa',
      })
    ).rejects.toThrow();
  });

  it('Should not allow feedback with invalid screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Está tudo errado!',
        screenshot: 'test.png',
      })
    ).rejects.toThrow();
  });
});
