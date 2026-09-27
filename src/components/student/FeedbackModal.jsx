import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Star, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ThumbsUp
} from 'lucide-react';

export const FeedbackModal = ({ order, onClose }) => {
  const { submitFeedback, cafeterias, menuItems } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTag, setSelectedTag] = useState('⚡ 2-min pickup');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tags = [
    '⚡ 2-min pickup',
    '🔥 Hot & Fresh',
    '👌 Great Portion',
    '🌱 Zero Waste',
    '🌟 Friendly Counter'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback({
      cafeteriaId: order?.cafeteriaId || 'caf-main',
      itemId: order?.items?.[0]?.id || 'item-1',
      rating,
      comment: comment || 'Food was ready right on time with the digital token!',
      tag: selectedTag
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md glass-panel rounded-2xl border border-slate-700 p-6 shadow-2xl relative space-y-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Review Submitted!</h3>
            <p className="text-xs text-slate-400">
              You earned <span className="text-amber-400 font-bold">+25 XP</span>. Your feedback helps cafeteria staff forecast fresher batches.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                <Star className="w-4 h-4 fill-orange-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Rate Your Cafeteria Meal</h3>
                <p className="text-xs text-slate-400">
                  {order ? `Token #${order.tokenId} • ${order.cafeteriaName}` : "St. Peter's Dining Experience"}
                </p>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col items-center justify-center py-2 bg-slate-900/60 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform active:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        (hoverRating || rating) >= star
                          ? 'text-amber-400 fill-amber-400 drop-shadow'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-300 mt-2">
                {rating === 5 ? 'Exceptional & Fresh!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Average' : 'Needs Improvement'}
              </span>
            </div>

            {/* Quick Experience Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Highlight Experience:</label>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      selectedTag === tag
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Comments or Suggestions (Optional):
              </label>
              <textarea
                rows={3}
                placeholder="How was the taste, pickup speed, or food freshness?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* XP Bonus Notice & Submit */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Earn +25 XP</span>
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Submit Feedback</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
