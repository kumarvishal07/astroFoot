const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'podomancy.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Shape Traits
content = content.replace(
  /en: "You are an anchor in your social circle, valuing old friends over passing acquaintances. You possess a pragmatic and resilient personality.",\s*hi: "आप अपने सामाजिक दायरे में एक मजबूत स्तंभ हैं, जो नए परिचितों के बजाय पुराने दोस्तों को महत्व देते हैं। आपका व्यक्तित्व व्यावहारिक और लचीला है।"\s*\}/g,
  `en: "You are an anchor in your social circle, valuing old friends over passing acquaintances. You possess a pragmatic and resilient personality.",
      hi: "आप अपने सामाजिक दायरे में एक मजबूत स्तंभ हैं, जो नए परिचितों के बजाय पुराने दोस्तों को महत्व देते हैं। आपका व्यक्तित्व व्यावहारिक और लचीला है।"
    },
    suggestion: {
      en: "Practice grounding meditation to maintain your natural stability. Focus on building long-term habits.",
      hi: "अपनी स्वाभाविक स्थिरता बनाए रखने के लिए ग्राउंडिंग ध्यान का अभ्यास करें। दीर्घकालिक आदतें बनाने पर ध्यान दें।"
    }`
);

content = content.replace(
  /en: "You are the life of the party with a vibrant social life. Your personality is naturally charismatic and outgoing.",\s*hi: "आप अपने जीवंत सामाजिक जीवन के साथ हर महफिल की जान हैं। आपका व्यक्तित्व स्वाभाविक रूप से करिश्माई और मिलनसार है।"\s*\}/g,
  `en: "You are the life of the party with a vibrant social life. Your personality is naturally charismatic and outgoing.",
      hi: "आप अपने जीवंत सामाजिक जीवन के साथ हर महफिल की जान हैं। आपका व्यक्तित्व स्वाभाविक रूप से करिश्माई और मिलनसार है।"
    },
    suggestion: {
      en: "Channel your adventurous energy into learning a new skill or hobby. Remember to take time for self-reflection.",
      hi: "अपनी साहसिक ऊर्जा को कोई नया कौशल या शौक सीखने में लगाएं। आत्म-निरीक्षण के लिए समय निकालना याद रखें।"
    }`
);

content = content.replace(
  /en: "You prefer a tight-knit circle of trusted friends. Your personality is introspective, carrying an air of mystery.",\s*hi: "आप भरोसेमंद दोस्तों का एक छोटा दायरा पसंद करते हैं। आपका व्यक्तित्व आत्मनिरीक्षण करने वाला है, जिसमें रहस्य की भावना है।"\s*\}/g,
  `en: "You prefer a tight-knit circle of trusted friends. Your personality is introspective, carrying an air of mystery.",
      hi: "आप भरोसेमंद दोस्तों का एक छोटा दायरा पसंद करते हैं। आपका व्यक्तित्व आत्मनिरीक्षण करने वाला है, जिसमें रहस्य की भावना है।"
    },
    suggestion: {
      en: "Your intuition is a gift—spend time in quiet environments to recharge and listen to your inner voice.",
      hi: "आपका अंतर्ज्ञान एक उपहार है—रिचार्ज होने और अपनी अंतरात्मा की आवाज़ सुनने के लिए शांत वातावरण में समय बिताएं।"
    }`
);

// Line Traits
content = content.replace(
  /en: "You naturally command respect in group settings. Your character is strong-willed and confident.",\s*hi: "समूह सेटिंग्स में स्वाभाविक रूप से आपका सम्मान किया जाता है। आपका चरित्र दृढ़ इच्छाशक्ति वाला और आत्मविश्वासी है।"\s*\}/g,
  `en: "You naturally command respect in group settings. Your character is strong-willed and confident.",
      hi: "समूह सेटिंग्स में स्वाभाविक रूप से आपका सम्मान किया जाता है। आपका चरित्र दृढ़ इच्छाशक्ति वाला और आत्मविश्वासी है।"
    },
    suggestion: {
      en: "Leverage your strong willpower by setting clear, ambitious goals. Don't shy away from leadership roles.",
      hi: "स्पष्ट और महत्वाकांक्षी लक्ष्य निर्धारित करके अपनी मजबूत इच्छाशक्ति का लाभ उठाएं। नेतृत्व की भूमिकाओं से न हिचकिचाएं।"
    }`
);

content = content.replace(
  /en: "Your social circle may change frequently as you evolve. You have an adaptable and deeply sensitive personality.",\s*hi: "जैसे-जैसे आप विकसित होते हैं, आपका सामाजिक दायरा अक्सर बदल सकता है। आपका व्यक्तित्व अनुकूलनीय और गहराई से संवेदनशील है।"\s*\}/g,
  `en: "Your social circle may change frequently as you evolve. You have an adaptable and deeply sensitive personality.",
      hi: "जैसे-जैसे आप विकसित होते हैं, आपका सामाजिक दायरा अक्सर बदल सकता है। आपका व्यक्तित्व अनुकूलनीय और गहराई से संवेदनशील है।"
    },
    suggestion: {
      en: "Embrace flexibility in your daily routine. Practice mindfulness to handle unpredictable changes with grace.",
      hi: "अपनी दिनचर्या में लचीलेपन को अपनाएं। अप्रत्याशित परिवर्तनों को शालीनता से संभालने के लिए माइंडफुलनेस का अभ्यास करें।"
    }`
);

content = content.replace(
  /en: "You may often find yourself as the peacemaker among friends. Your personality is highly empathetic but prone to absorbing others' worries.",\s*hi: "आप अक्सर खुद को दोस्तों के बीच शांतिदूत के रूप में पा सकते हैं। आपका व्यक्तित्व अत्यधिक सहानुभूतिपूर्ण है लेकिन दूसरों की चिंताओं को आसानी से अपना लेता है।"\s*\}/g,
  `en: "You may often find yourself as the peacemaker among friends. Your personality is highly empathetic but prone to absorbing others' worries.",
      hi: "आप अक्सर खुद को दोस्तों के बीच शांतिदूत के रूप में पा सकते हैं। आपका व्यक्तित्व अत्यधिक सहानुभूतिपूर्ण है लेकिन दूसरों की चिंताओं को आसानी से अपना लेता है।"
    },
    suggestion: {
      en: "Incorporate stress-relief activities like yoga or deep breathing into your day. Learn to say 'no' to avoid burnout.",
      hi: "अपने दिन में योग या गहरी सांस लेने जैसी तनाव-मुक्ति गतिविधियों को शामिल करें। बर्नआउट से बचने के लिए 'ना' कहना सीखें।"
    }`
);

// Size Traits
content = content.replace(
  /en: "You are widely recognized as a dependable friend. You project a calm, assertive, and steadfast aura.",\s*hi: "आपको व्यापक रूप से एक भरोसेमंद दोस्त के रूप में पहचाना जाता है। आप एक शांत, मुखर और दृढ़ आभा प्रदर्शित करते हैं।"\s*\}/g,
  `en: "You are widely recognized as a dependable friend. You project a calm, assertive, and steadfast aura.",
      hi: "आपको व्यापक रूप से एक भरोसेमंद दोस्त के रूप में पहचाना जाता है। आप एक शांत, मुखर और दृढ़ आभा प्रदर्शित करते हैं।"
    },
    suggestion: {
      en: "Since you carry the weight for others, establish healthy emotional boundaries. Make sure to prioritize your own needs.",
      hi: "चूंकि आप दूसरों का भार उठाते हैं, इसलिए स्वस्थ भावनात्मक सीमाएं स्थापित करें। अपनी जरूरतों को प्राथमिकता देना सुनिश्चित करें।"
    }`
);

content = content.replace(
  /en: "You shine in intimate, creative social gatherings. Your personality is artistic, gentle, and uniquely expressive.",\s*hi: "आप अंतरंग, रचनात्मक सामाजिक समारोहों में चमकते हैं। आपका व्यक्तित्व कलात्मक, कोमल और विशिष्ट रूप से अभिव्यंजक है।"\s*\}/g,
  `en: "You shine in intimate, creative social gatherings. Your personality is artistic, gentle, and uniquely expressive.",
      hi: "आप अंतरंग, रचनात्मक सामाजिक समारोहों में चमकते हैं। आपका व्यक्तित्व कलात्मक, कोमल और विशिष्ट रूप से अभिव्यंजक है।"
    },
    suggestion: {
      en: "Protect your sensitive energy by curating a peaceful living space. Engage regularly in creative outlets.",
      hi: "शांतिपूर्ण रहने की जगह बनाकर अपनी संवेदनशील ऊर्जा को सुरक्षित रखें। रचनात्मक कार्यों में नियमित रूप से भाग लें।"
    }`
);

// generateDetailedReading function
content = content.replace(
  /personality: \{\s*en: \`\$\{shape.personality.en\} \$\{lines.personality.en\} \$\{size.personality.en\}\`,\s*hi: \`\$\{shape.personality.hi\} \$\{lines.personality.hi\} \$\{size.personality.hi\}\`\s*\}/g,
  `personality: {
        en: \`\${shape.personality.en} \${lines.personality.en} \${size.personality.en}\`,
        hi: \`\${shape.personality.hi} \${lines.personality.hi} \${size.personality.hi}\`
      },
      suggestion: {
        en: \`\${shape.suggestion.en} \${lines.suggestion.en} \${size.suggestion.en}\`,
        hi: \`\${shape.suggestion.hi} \${lines.suggestion.hi} \${size.suggestion.hi}\`
      }`
);

fs.writeFileSync(filePath, content);
console.log('Done modifying podomancy.ts');
