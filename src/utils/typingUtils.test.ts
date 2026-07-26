import { describe, expect, test } from 'vitest';
import { getCharacterState, type CharacterState } from './typingUtils';

describe('getCharacterState', () => {
    test('returns correct state for correct character', () => {
        const result: CharacterState = getCharacterState('T', 0, 'T');
        expect(result).toEqual({ displayChar: 'T', hasTyped: true, isCorrect: true });
    })

    test('returns correct state for incorrect character', () => {
        const result: CharacterState = getCharacterState('T', 0, 'X');
        expect(result).toEqual({ displayChar: 'X', hasTyped: true, isCorrect: false });
    })      

    test('shows underscore for an incorrect space', () => {
        const result: CharacterState = getCharacterState('T', 0, ' ');
        expect(result).toEqual({ displayChar: '_', hasTyped: true, isCorrect: false });
    })  
    
    test('returns correct state for a correct space', () => {
        const result: CharacterState = getCharacterState(' ', 0, ' ');
        expect(result).toEqual({ displayChar: ' ', hasTyped: true, isCorrect: true });
    })  
    
    test('returns ghost state for an untyped position', () => {
        const result: CharacterState = getCharacterState('T', 0, '');
        expect(result).toEqual({ displayChar: 'T', hasTyped: false, isCorrect: false });
    })
})