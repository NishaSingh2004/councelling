import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="premium-card p-8 flex flex-col justify-between h-full relative">
      {/* Background Quote Mark */}
      <div className="absolute top-6 right-6 text-beige-100 dark:text-sage-900/20 -z-10">
        <Quote className="h-10 w-10 fill-current" />
      </div>

      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4.5 w-4.5 text-amber-500 fill-current" />
          ))}
        </div>

        {/* Feedback text */}
        <p className="text-stone-600 dark:text-sage-300 font-light italic leading-relaxed text-sm">
          "{testimonial.text}"
        </p>
      </div>

      {/* Profile info */}
      <div className="mt-8 pt-5 border-t border-beige-100 dark:border-sage-800/40 flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover border border-stone-200 dark:border-sage-800"
        />
        <div>
          <span className="block font-serif text-sm font-bold text-stone-900 dark:text-white">
            {testimonial.name}
          </span>
          <span className="text-xs text-stone-400 dark:text-sage-500">
            {testimonial.role}
          </span>
          <span className="inline-block ml-2 text-[10px] px-2 py-0.5 rounded-full bg-sage-50 dark:bg-sage-950 text-sage-600 dark:text-sage-400 font-medium">
            {testimonial.service}
          </span>
        </div>
      </div>
    </div>
  );
}
