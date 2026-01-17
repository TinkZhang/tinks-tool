

'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const StoryPage: React.FC = () => {
  const [story, setStory] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      const { data, error } = await supabase
        .from('story')
        .select('title, content')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching story:', error);
        setError('Failed to load the story. Please make sure your Supabase credentials are correct and the table/columns exist.');
      } else {
        setStory(data);
      }
      setLoading(false);
    };

    fetchStory();
  }, []);

  // Function to render paragraphs from plain text content
  const renderStoryParagraphs = (text: string) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4" style={{ marginBottom: '1em' }}>
        {paragraph.trim()}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f2f2f2' }}>
        <p style={{ fontSize: '2.2em', fontFamily: 'serif' }}>Loading story...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f2f2f2' }}>
        <p className="text-red-500" style={{ fontSize: '1.5em', fontFamily: 'sans-serif', maxWidth: '600px', textAlign: 'center' }}>{error}</p>
      </div>
    );
  }

  if (!story) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f2f2f2' }}>
            <p style={{ fontSize: '2.2em', fontFamily: 'serif' }}>No story found.</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f2f2f2', color: '#333' }}>
      <main className="max-w-prose mx-auto text-center" style={{ fontFamily: 'serif', fontSize: '2.2em', lineHeight: '1.8', padding: '1em', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 className="text-4xl font-bold mb-6" style={{ fontSize: '2.5em', marginBottom: '1em' }}>{story.title}</h1>
        {renderStoryParagraphs(story.content)}
      </main>
    </div>
  );
};

export default StoryPage;
