import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Modal from './Modal';
import videoThumb1 from '../assets/season-spring.png';
import videoThumb2 from '../assets/category-vegetables.png';
import videoThumb3 from '../assets/category-flowers.png';

const tutorials = [
    { id: 1, title: 'Starting Seeds Indoors', duration: '12:45', thumbnail: videoThumb1, url: 'https://www.w3schools.com/html/mov_bbb.mp4', desc: 'Basics of starting from seed.' },
    { id: 2, title: 'Pruning Tomatoes', duration: '08:20', thumbnail: videoThumb2, url: 'https://www.w3schools.com/html/mov_bbb.mp4', desc: 'Maximize your harvest.' },
    { id: 3, title: 'Designing Flower Beds', duration: '15:10', thumbnail: videoThumb3, url: 'https://www.w3schools.com/html/mov_bbb.mp4', desc: 'Color coordination tips.' }
];

const VideoTutorials = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <section id="tutorials" className="py-24 px-6 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="bg-stone-900/5 p-8 rounded-3xl backdrop-blur-sm">
                    <motion.div className="text-center mb-16">
                        <span className="text-green-700 font-semibold tracking-wider uppercase text-sm">Watch & Learn</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3">Video Tutorials</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutorials.map((video, index) => (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedVideo(video)}
                                className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                        <div className="bg-white/90 p-3 rounded-full"><Play className="w-6 h-6 text-green-600 fill-current" /></div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-stone-900 mb-2">{video.title}</h3>
                                    <p className="text-stone-600 text-sm">{video.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} title={selectedVideo?.title}>
                {selectedVideo && (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video src={selectedVideo.url} controls autoPlay className="w-full h-full" />
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default VideoTutorials;
