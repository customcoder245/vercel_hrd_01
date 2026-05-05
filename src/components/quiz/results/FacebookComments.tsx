import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import avatar1 from "@/assets/woman-avatar-1.webp";
import avatar2 from "@/assets/woman-avatar-2.webp";
import avatar3 from "@/assets/woman-avatar-3.webp";
import maleAvatar1 from "@/assets/man-avatar-1.webp";
import avatar5 from "@/assets/woman-avatar-5.webp";
import avatar6 from "@/assets/woman-avatar-6.webp";
import maleAvatar2 from "@/assets/man-avatar-2.webp";
import avatar8 from "@/assets/woman-avatar-8.webp";

const comments = [
  {
    name: "Sarah Mitchell",
    avatar: avatar1,
    time: "2d",
    text: "Just finished my first month and I'm down 14 lbs!! The recipes are SO good I don't even feel like I'm dieting. My husband is eating the meals with me now too 😂",
    likes: 47,
    replies: 8,
  },
  {
    name: "Karen Lopez",
    avatar: avatar2,
    time: "3d",
    text: "Can we talk about the energy levels?? I used to crash every afternoon at 2pm and now I feel amazing all day. Plus my jeans from 2 years ago fit again 🙌",
    likes: 83,
    replies: 12,
  },
  {
    name: "Michelle Torres",
    avatar: avatar3,
    time: "4d",
    text: "I was so skeptical at first but my doctor literally asked me what I've been doing differently at my last checkup. Cholesterol is down, blood pressure improved. This isn't just a diet it's a lifestyle change ❤️",
    likes: 124,
    replies: 21,
  },
  {
    name: "James Rivera",
    avatar: maleAvatar1,
    time: "5d",
    text: "My wife got me into this and honestly I was skeptical. Down 17 lbs in 5 weeks and my energy at work is through the roof. Even my golf game has improved 😂💪",
    likes: 56,
    replies: 6,
  },
  {
    name: "Amanda Chen",
    avatar: avatar5,
    time: "1w",
    text: "My friend recommended this to me after she lost 22 lbs. I just started last week and I'm already seeing changes. The meal prep guides make it so easy even for someone like me who hates cooking lol",
    likes: 39,
    replies: 4,
  },
  {
    name: "Rachel Kim",
    avatar: avatar6,
    time: "1w",
    text: "3 months in, 31 pounds down. I've tried keto, WW, counting calories... nothing stuck until this. The Hormone Reset approach just makes sense and the food is actually delicious 🫒🍅",
    likes: 201,
    replies: 34,
  },
  {
    name: "Mark Thompson",
    avatar: maleAvatar2,
    time: "1w",
    text: "I'm 52 and my doctor told me I needed to make changes. 6 weeks in, down 21 lbs, blood pressure improved, and I actually look forward to meals now. Wish I found this sooner 👊",
    likes: 167,
    replies: 28,
  },
  {
    name: "Diana Patel",
    avatar: avatar8,
    time: "2w",
    text: "The grocery lists alone are worth it. I'm actually spending LESS on food now and eating way better. My skin is clearer too which I didn't expect at all!",
    likes: 72,
    replies: 9,
  },
];

const FacebookComments = () => {
  
  return (
  <div className="py-10 px-6">
    <div className="mx-auto max-w-xl">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-6">
        What Our Community Is Saying
      </h2>

      {/* Facebook-style container */}
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        {/* Facebook page header */}
        <div className="bg-[#1877F2] px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1877F2] font-bold text-sm">f</span>
          </div>
          <div>
            <p className="text-white font-display font-bold text-sm">Hormone Reset Diet Community</p>
            <p className="text-white/70 text-xs font-body">Public Group · 153K members</p>
          </div>
        </div>

        {/* Comments */}
        <div className="divide-y divide-border">
          {comments.map((c, i) => (
            <div key={i} className="px-4 py-3.5">
              <div className="flex gap-2.5">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-display font-bold text-foreground">{c.name}</span>
                      <span className="text-xs font-body text-muted-foreground">{c.time}</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                  <p className="text-[13px] font-body text-foreground/90 leading-relaxed mt-1">{c.text}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-[#1877F2] transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{c.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-[#1877F2] transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{c.replies} replies</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-[#1877F2] transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-muted/30 px-4 py-2.5 text-center border-t border-border">
          <p className="text-xs font-body text-muted-foreground">
            Showing 8 of 2,341 comments
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default FacebookComments;
