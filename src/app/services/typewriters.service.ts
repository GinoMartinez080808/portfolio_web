import { Inject, Injectable, PLATFORM_ID, Signal, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TypewritersService {
  private text = signal('');
  private index = 0;
  private letter = 0;
  private isDeleting = false;
  private phrases: string[] = [];
  private typing = false;

  displayText: Signal<string> = this.text;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  start(phrases: string[], speed = 80, pause = 1000) {
    if (!isPlatformBrowser(this.platformId)) return; // ⛔️ No ejecutar en SSR
    if (this.typing || phrases.length === 0) return;

    this.typing = true;
    this.phrases = phrases;

    const type = () => {
      const phrase = this.phrases[this.index % this.phrases.length];
      const current = this.isDeleting
        ? phrase.substring(0, --this.letter)
        : phrase.substring(0, ++this.letter);

      this.text.set(current);

      let delay = speed;
      if (!this.isDeleting && current === phrase) {
        this.isDeleting = true;
        delay = pause;
      } else if (this.isDeleting && current === '') {
        this.isDeleting = false;
        this.index++;
        delay = 500;
      }

      setTimeout(type, delay);
    };

    type(); // inicia el bucle
  }
}