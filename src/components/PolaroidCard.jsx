import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PolaroidCard = ({ photo }) => {
    const { url, timestamp } = photo;
    
    // Fixed width for all cards
    const cardWidth = 250;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-md shadow-xl overflow-hidden relative m-2"
            style={{
                width: `${cardWidth}px`,
                display: 'inline-block',
                border: '6px solid white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)'
            }}
        >
            <div
                className="w-full overflow-hidden relative bg-gray-200"
                style={{
                    aspectRatio: '4 / 3', // Fixed 4:3 aspect ratio
                    position: 'relative',
                    marginBottom: '-3px',
                }}
            >
                <LazyLoadImage
                    src={url}
                    alt={`Polaroid taken at ${new Date(timestamp).toLocaleString()}`}
                    effect="blur"
                    className="w-full h-full"
                    style={{
                        objectFit: 'cover', // Changed from 'fill' to 'cover' for better image display
                        objectPosition: 'center',
                    }}
                />
            </div>

            {/* Timestamp */}
            <div
                className="px-1 py-0.5 text-center text-[10px] text-gray-600 bg-white relative"
                style={{
                    fontFamily: 'monospace',
                    height: '15px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                 <span style={{position: 'relative', top: '1px'}}>{new Date(timestamp).toLocaleString()}</span>
            </div>
        </motion.div>
    );
};

export default PolaroidCard;
