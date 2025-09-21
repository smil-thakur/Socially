import {
  LanguageSupport,
  LanguageDescription,
  StreamParser,
  StreamLanguage,
} from '@codemirror/language';

function legacy(parser: StreamParser<unknown>): LanguageSupport {
  return new LanguageSupport(StreamLanguage.define(parser));
}

/// An array of language descriptions for known language packages.
export const languages = [
  LanguageDescription.of({
    name: 'JSON',
    alias: ['json5'],
    extensions: ['json', 'map'],
    load() {
      return import('@codemirror/lang-json').then((m) => m.json());
    },
  }),
  LanguageDescription.of({
    name: 'LaTeX',
    alias: ['tex'],
    extensions: ['text', 'ltx', 'tex'],
    load() {
      return import('@codemirror/legacy-modes/mode/stex').then((m) =>
        legacy(m.stex)
      );
    },
  }),
];
