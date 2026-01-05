

import React from 'react';

const StoryPage: React.FC = () => {
  // Mocked story content - this would eventually come from an API as plain text
  const storyContent = `
    从前，有一只非常可爱的小熊，他最喜欢吃甜甜的蜂蜜了。

    有一天，小熊在森林里散步，突然闻到了一股香甜的味道。他跟着味道走啊走，
    发现了一个大大的蜂蜜罐！小熊高兴极了，他小心翼翼地打开罐子，哇，里面装满了金黄色的蜂蜜！

    小熊迫不及待地挖了一大勺，放进嘴里。嗯，真是太美味了！他吃了一口又一口，
    直到肚子圆滚滚的，才心满意足地停下来。

    小熊决定把这个蜂蜜罐带回家，这样他每天都可以吃到甜甜的蜂蜜了。
    他抱着蜂蜜罐，开心地往家走去。

    回到家，小熊把蜂蜜罐藏在一个秘密的地方。他想，这是我的秘密宝藏！
    从那天起，小熊每天都会偷偷地吃一点蜂蜜，他的生活变得更甜了。

    小熊知道，分享是快乐的。他决定下次找到蜂蜜的时候，和他的好朋友小兔子、小松鼠一起分享。
  `;

  // Function to render paragraphs from plain text content
  const renderStoryParagraphs = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4" style={{ marginBottom: '1em' }}>
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f2f2f2', color: '#333' }}>
      <main className="max-w-prose mx-auto text-center" style={{ fontFamily: 'serif', fontSize: '2.2em', lineHeight: '1.8', padding: '1em', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 className="text-4xl font-bold mb-6" style={{ fontSize: '2.5em', marginBottom: '1em' }}>小熊的蜂蜜罐</h1>
        {renderStoryParagraphs(storyContent)}
      </main>
    </div>
  );
};

export default StoryPage;
