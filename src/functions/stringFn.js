import React from 'react';

function excerpt(text) {
    return text.length>100?text.substring(0,100)+"...":text;
    //문장 길이가 100 이상이면 100에서부터 ...으로 짜르고 아니면 그냥 텍스트 출력
}

export {excerpt}