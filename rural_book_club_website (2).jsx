import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaBook } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

export default function BookBasketApp() {
  const [activeTab, setActiveTab] = useState("info");
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const [textSize, setTextSize] = useState("text-lg");
  const [highContrast, setHighContrast] = useState(false);

  const currentBook = "The Thursday Murder Club";
  const finishBy = "15 April";
  const nextDelivery = "15 April";
  const progress = 40;

  const [signup, setSignup] = useState({ name: "", email: "", address: "" });

  const [selectedBook, setSelectedBook] = useState(null);
  const [voteMessage, setVoteMessage] = useState("");

  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Margaret (72)",
      rating: 5,
      text: "A beautifully written and comforting novel that made me feel connected to the characters. The pacing allowed reflection and the friendships felt very real and grounded.",
      replies: ["Completely agree!"],
    },
    {
      id: 2,
      name: "Harold (75)",
      rating: 5,
      text: "This book reminded me of the importance of friendship later in life. The humour felt natural and never forced, and I enjoyed every chapter at a relaxed pace.",
      replies: [],
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [newRating, setNewRating] = useState(4);
  const [replyTexts, setReplyTexts] = useState({});
  const [sendMail, setSendMail] = useState(false);

  const books = {
    "The Midnight Library": "https://covers.openlibrary.org/b/isbn/9781786892737-L.jpg",
    "Lessons in Chemistry": "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg",
    "Tomorrow, and Tomorrow, and Tomorrow": "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg"
  };

  const [poll, setPoll] = useState({
    "The Midnight Library": 0,
    "Lessons in Chemistry": 0,
    "Tomorrow, and Tomorrow, and Tomorrow": 0
  });

  const pastWinners = ["The Thursday Murder Club", "The Dry", "Where the Crawdads Sing"];

  const pastBooks = [
    { title: "The Dry", rating: 4.2 },
    { title: "The Rosie Project", rating: 4.5 },
    { title: "Big Little Lies", rating: 4.1 },
    { title: "Where the Crawdads Sing", rating: 4.3 },
    { title: "Eleanor Oliphant is Completely Fine", rating: 4.4 }
  ];

  const handleVote = (book) => {
    setPoll({ ...poll, [book]: poll[book] + 1 });
    setSelectedBook(book);
    setVoteMessage("✅ Your vote has been counted");
    setTimeout(()=>setVoteMessage(""), 2000);
  };

  const addPost = () => {
    if (!newPost) return;
    setPosts([...posts, { id: Date.now(), name: "You", rating: newRating, text: newPost, replies: [] }]);
    setNewPost("");
  };

  const addReply = (id) => {
    if (!replyTexts[id]) return;
    setPosts(posts.map(p => p.id === id ? { ...p, replies: [...p.replies, replyTexts[id]] } : p));
    setReplyTexts({ ...replyTexts, [id]: "" });
  };

  const chartData = Object.keys(poll).map(book => ({ name: book, votes: poll[book] }));

  return (
    <div className={`p-6 max-w-4xl mx-auto min-h-screen font-sans ${textSize} ${highContrast ? "bg-black text-white" : "bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100"}`} style={{fontFamily: 'Rubik, Roboto, sans-serif'}}>
      <h1 className="text-3xl font-bold text-center mb-6 flex justify-center gap-2">
        📚 <FaBook /> The Book Basket
      </h1>

      <div className="flex justify-end gap-2 mb-4">
        <Button size="sm" onClick={() => setShowAccessibility(!showAccessibility)}>Accessibility</Button>
        <Button size="sm" onClick={() => setShowContact(!showContact)}>Contact</Button>
      </div>

      {showAccessibility && (
        <div className="flex gap-2 mb-4 justify-end">
          <Button onClick={() => setTextSize("text-base")}>A</Button>
          <Button onClick={() => setTextSize("text-lg")}>A+</Button>
          <Button onClick={() => setTextSize("text-xl")}>A++</Button>
          <Button onClick={() => setTextSize("text-2xl")}>A+++</Button>
          <Button onClick={() => setHighContrast(!highContrast)}>Contrast</Button>
        </div>
      )}

      {showContact && (
        <div className="mb-4 p-3 bg-white rounded shadow text-sm">
          📞 1300 123 456<br/>
          📍 33 Lygon Street, Carlton VIC 3053<br/>
          ✉️ thebreadbasket@gmail.com.au
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["info","signup","vote","community","support"].map(tab => (
          <motion.div key={tab} whileHover={{ scale: 1.05 }}>
            <Button className="transition-shadow hover:shadow-lg hover:shadow-orange-200" variant={activeTab===tab?'default':'outline'} onClick={() => setActiveTab(tab)}>
              {tab}
            </Button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">

      {activeTab === "info" && (
        <motion.div key="info" initial={{opacity:0}} animate={{opacity:1}}>
          <Card className="p-4 shadow rounded-xl">
            <CardContent>
              <h2 className="font-semibold">Information</h2>
              <ul className="mt-2 list-disc ml-5">
                <li>Receive a book every fortnight 📦</li>
                <li>Read at your own pace 📖</li>
                <li>Join a friendly community 💬</li>
              </ul>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba" className="rounded-lg object-cover h-32 w-full" />
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" className="rounded-lg object-cover h-32 w-full" />
              </div>

              <h3 className="mt-4 font-semibold">Newsletter Archive</h3>
              <Button onClick={()=>setShowNewsletter(true)}>Read This Fortnight’s Newsletter</Button>
              <p className="text-sm mt-2">Printed copy included with your next book</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "signup" && (
        <motion.div key="signup" initial={{opacity:0}} animate={{opacity:1}}>
          <Card className="p-4 shadow rounded-xl">
            <CardContent>
              <h2 className="font-semibold">Sign Up</h2>
              <Input placeholder="Name" className="mb-2" onChange={e=>setSignup({...signup,name:e.target.value})}/>
              <Input placeholder="Email" className="mb-2" onChange={e=>setSignup({...signup,email:e.target.value})}/>
              <Input placeholder="Address" className="mb-2" onChange={e=>setSignup({...signup,address:e.target.value})}/>
              <p className="text-sm mb-2">$10 per fortnight</p>
              <Button>Join</Button>
              <div className="mt-4 text-sm">
                <p>You can call or mail us your review if you prefer:</p>
                <p>📞 1300 123 456</p>
                <p>📍 33 Lygon Street, Carlton VIC 3053</p>
                <p>✉️ thebreadbasket@gmail.com.au</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "vote" && (
        <motion.div key="vote" initial={{opacity:0}} animate={{opacity:1}}>
          <Card className="p-4 shadow rounded-xl">
            <CardContent>
              <h2 className="font-semibold">Vote (closes 20 April)</h2>
              {voteMessage && <p className="text-green-600 text-sm">{voteMessage}</p>}
              {Object.keys(poll).map(book => (
                <button
                  key={book}
                  onClick={()=>handleVote(book)}
                  className={`w-full h-40 mb-3 rounded-xl overflow-hidden relative group shadow-md ${selectedBook===book?'ring-4 ring-orange-400':''}`}
                >
                  <img
                    src={books[book]}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e)=>{e.currentTarget.src='https://images.unsplash.com/photo-1512820790803-83ca734da794'}}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-2">
                    <div className="font-semibold text-lg">{book}</div>
                    <div className="text-sm">Tap to vote</div>
                  </div>
                </button>
              ))}

              <div className="h-60 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" tick={{fontSize:10,angle:-20}} />
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="votes"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <h3 className="mt-4 font-semibold">Past Winners</h3>
              <ul>{pastWinners.map((b,i)=><li key={i}>{b}</li>)}</ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "community" && (
        <motion.div key="community" initial={{opacity:0}} animate={{opacity:1}}>
          <Card className="p-4 shadow rounded-xl">
            <CardContent>

              <div className="mb-4 p-4 bg-yellow-100 rounded-xl border-l-4 border-yellow-500">
                <h3 className="font-semibold text-lg">⭐ Featured Review</h3>
                <p className="italic text-base">"A deeply comforting and warm story that made me feel connected and uplifted."</p>
                <p className="text-sm mt-1">⭐⭐⭐⭐⭐ – Margaret (72)</p>
              </div>

              <div className="mb-4 p-3 bg-white rounded shadow">
                <h3>📖 Current Book: {currentBook}</h3>
                <p>Finish by: {finishBy}</p>
                <p>Next delivery: {nextDelivery}</p>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-blue-400 h-2 rounded" style={{width:`${progress}%`}}></div>
                </div>
              </div>

              <h3>Add Review</h3>
              <Textarea value={newPost} onChange={e=>setNewPost(e.target.value)} />
              <div className="flex items-center gap-2 mt-2">
                <span>Rating:</span>
                <select value={newRating} onChange={e=>setNewRating(Number(e.target.value))}>
                  {[1,2,3,4,5].map(n=><option key={n} value={n}>{n} ⭐</option>)}
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                <input type="checkbox" checked={sendMail} onChange={e=>setSendMail(e.target.checked)} />
                <span className="text-sm">Include in printed newsletter</span>
              </div>
              <Button onClick={addPost} className="mt-2">Post</Button>

              {posts.map(p=> (
                <div key={p.id} className="mt-4 p-3 border rounded bg-white transition hover:shadow-lg">
                  <p>{p.name} • {'⭐'.repeat(p.rating)}</p>
                  <p>{p.text}</p>
                  {p.replies.map((r,i)=><p key={i} className="ml-4 text-sm">↳ {r}</p>)}
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="Reply" value={replyTexts[p.id]||""} onChange={e=>setReplyTexts({...replyTexts,[p.id]:e.target.value})}/>
                    <Button onClick={()=>addReply(p.id)}>Reply</Button>
                  </div>
                </div>
              ))}

              <h3 className="mt-6">Past Reviews</h3>
              {pastBooks.map((b,i)=>(
                <div key={i} className="p-2 border rounded mt-2">
                  📖 {b.title} • {'⭐'.repeat(Math.round(b.rating))}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === "support" && (
        <motion.div key="support" initial={{opacity:0}} animate={{opacity:1}}>
          <Card className="p-4 shadow rounded-xl">
            <CardContent>
              <h2>Support Us</h2>
              <Button className="hover:shadow-lg hover:shadow-orange-200">Donate $5</Button>
              <Button className="ml-2 hover:shadow-lg hover:shadow-orange-200">Donate $10</Button>
              <p className="mt-3">Sponsors: RMIT, State of Victoria</p>
              <Input placeholder="Organisation" className="mt-2"/>
              <Input placeholder="Email" className="mt-2" value="thebreadbasket@gmail.com.au"/>
              <Textarea placeholder="Message" className="mt-2"/>
            </CardContent>
          </Card>
        </motion.div>
      )}

      </AnimatePresence>

      {showNewsletter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md">
            <h2 className="font-semibold mb-2">📬 This Fortnight’s Newsletter</h2>
            <p className="text-sm">Featured Review: "A deeply comforting story that builds a real sense of companionship."</p>
            <p className="text-sm mt-2">📢 Updates: Next book arriving soon!</p>
            <Button className="mt-4" onClick={()=>setShowNewsletter(false)}>Close</Button>
          </div>
        </div>
      )}

    </div>
  );
}
