import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Function to generate a random card width
const getRandomWidth = () => {
    const widths = [240, 250, 260];  // Similar but slightly different
    return widths[Math.floor(Math.random() * widths.length)];
};

// Function to generate a random but not too extreme aspect ratio
const getRandomAspectRatio = () => {
    const ratios = [
        { width: 10, height: 8 },
        { width: 10, height: 7 },
        { width: 9, height: 7 },
        { width: 8, height: 9 },
        { width: 7, height: 8 },
        { width: 7, height: 10 },
        { width: 8, height: 10 },
        { width: 1, height: 1 },
    ];
    return ratios[Math.floor(Math.random() * ratios.length)];
};

const PolaroidCard = ({ photo }) => {
    const { url, timestamp } = photo;

    const cardWidth = getRandomWidth();
    const aspectRatio = getRandomAspectRatio();

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
                    aspectRatio: `${aspectRatio.width} / ${aspectRatio.height}`,
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
                        objectFit: 'fill',//Zoom and crop as necessary
                        objectPosition: 'center', // Center the image
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