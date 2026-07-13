import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { GALLERY_META } from '../data/gallery';
import type { GalleryImage } from '../types';

const BUCKET = 'site-assets';

export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.storage
      .from(BUCKET)
      .list('', { limit: 100, sortBy: { column: 'name', order: 'asc' } })
      .then(({ data }) => {
        if (!data) { setLoading(false); return; }
        const imgs: GalleryImage[] = data
          .filter(f => f.name !== '.emptyFolderPlaceholder')
          .map(f => {
            const meta = GALLERY_META[f.name] ?? { alt: f.name, title: f.name, subtitle: '' };
            const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(f.name);
            return { src: publicUrl, ...meta };
          });
        setImages(imgs);
        setLoading(false);
      });
  }, []);

  return { images, loading };
};
