import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import PolaroidCard from './components/PolaroidCard';
import './App.css';

function App() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const fileInputRef = useRef();

    const GIST_ID = import.meta.env.VITE_GIST_ID;
    const GIST_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

    const loadPhotos = async () => {
        setSyncing(true);
        try {
            const response = await axios.get(`https://api.github.com/gists/${GIST_ID}`, {
                headers: {
                    'Authorization': `token ${GIST_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.data.files && response.data.files['photobooth.json']) {
                const content = JSON.parse(response.data.files['photobooth.json'].content);
                if (content && Array.isArray(content.photos)) {
                    setPhotos(content.photos);
                }
            }
        } catch (error) {
            console.error('Failed to load photos:', error);
            alert('Failed to sync photos. Please check your Gist ID and token.');
        } finally {
            setSyncing(false);
        }
    };

    useEffect(() => {
        loadPhotos(); // Initial load
        
        // Changed from 30000 (30 seconds) to 10000 (10 seconds)
        const interval = setInterval(loadPhotos, 10000);
        
        return () => clearInterval(interval);
    }, []);

    // Handle temporary image upload
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newPhoto = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        url: e.target.result,
                        caption: 'Test Image',
                        timestamp: new Date().toISOString()
                    };
                    setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-rose-100 to-teal-100 p-4 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.75, ease: "easeInOut" } }}
            exit={{ opacity: 0 }}
        >
            {/* Background animations */}
            <motion.div
                className="absolute top-0 left-0 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                animate={{ x: [0, 50, 0, -50, 0], y: [0, 20, 0, -20, 0], scale: [1, 1.1, 1], rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
                animate={{ x: [0, -50, 0, 50, 0], y: [0, -20, 0, 20, 0], scale: [1, 1.1, 1], rotate: [0, -10, 0, 10, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h1
                    className="text-4xl font-bold text-gray-700 text-center mb-8 drop-shadow-md"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                >
                    Photo Scrapebook
                </motion.h1>

                {/* Test upload button */}
                <div className="text-center mb-8">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:bg-gray-50"
                    >
                        Add Test Images
                    </button>
                </div>

                {/* Photo Grid */}
                <div className="photo-grid">
                    <AnimatePresence>
                        {photos.map((photo, index) => (
                            <motion.div
                                key={photo.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index % 4 * 0.1,
                                    ease: "easeOut"
                                }}
                                className="relative group"
                            >
                                <PolaroidCard photo={photo} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {photos.length === 0 && !loading && !syncing && (
                    <motion.div
                        className="text-center text-gray-400 mt-8 drop-shadow-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.5 } }}
                    >
                        No photos yet!
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

export default App;
