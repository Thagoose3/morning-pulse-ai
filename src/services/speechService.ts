export class MorningSpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeakingCallback: ((speaking: boolean) => void) | null = null;

  static setCallback(cb: (speaking: boolean) => void) {
    this.isSpeakingCallback = cb;
  }

  static getCurrentUtterance() {
    return this.currentUtterance;
  }

  static speak(text: string, onEnd?: () => void): boolean {
    if (!this.synth) return false;

    // Stop existing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Try finding Thai voice or fallback to default
    const voices = this.synth.getVoices();
    const thaiVoice = voices.find(v => v.lang.includes('th') || v.name.includes('Thai'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
      utterance.lang = 'th-TH';
    } else {
      utterance.lang = 'th-TH';
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (this.isSpeakingCallback) this.isSpeakingCallback(true);
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (this.isSpeakingCallback) this.isSpeakingCallback(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (this.isSpeakingCallback) this.isSpeakingCallback(false);
    };

    this.synth.speak(utterance);
    return true;
  }

  static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      if (this.isSpeakingCallback) this.isSpeakingCallback(false);
    }
  }

  static isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}
