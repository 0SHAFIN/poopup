// components/YoutubeEmbed.tsx
'use client';

const YoutubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <iframe
        className="absolute h-full w-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeEmbed;