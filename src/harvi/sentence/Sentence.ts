/**
 * Created by johan on 11/11/2015.
 */


export class Sentence {
    sentenceLike: string[];

    constructor(listSentenceLike: string[]) {
        this.sentenceLike = listSentenceLike;
    }

    compute(sentence: string) {
        // let sentenceExist:boolean = this.sentenceLike.Contains(sentence);

        let found = this.sentenceLike.filter((currentSentence: string) => {
            return currentSentence === sentence;
        });

        if (found.length > 0)
            return true;

        return false;
    }
}