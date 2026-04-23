const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    // Catch arbitrary tailwind colors with optional opacity (like /10, /50, /30)
    // Primary Blue (#1e40af) -> Royal Gold (#D4AF37)
    { regex: /text-\[\#1e40af\](\/\d+)?/g, replace: 'text-[#D4AF37]$1' },
    { regex: /bg-\[\#1e40af\](\/\d+)?/g, replace: 'bg-[#D4AF37]$1' },
    { regex: /border-\[\#1e40af\](\/\d+)?/g, replace: 'border-[#D4AF37]$1' },
    { regex: /from-\[\#1e40af\](\/\d+)?/g, replace: 'from-[#D4AF37]$1' },
    { regex: /ring-\[\#1e40af\](\/\d+)?/g, replace: 'ring-[#D4AF37]$1' },
    { regex: /shadow-\[\#1e40af\](\/\d+)?/g, replace: 'shadow-[#D4AF37]$1' },

    // Darker Blue (#1e3a8a) -> Darker Gold/Bronze (#B8860B)
    { regex: /text-\[\#1e3a8a\](\/\d+)?/g, replace: 'text-[#B8860B]$1' },
    { regex: /border-\[\#1e3a8a\](\/\d+)?/g, replace: 'border-[#B8860B]$1' },
    { regex: /bg-\[\#1e3a8a\](\/\d+)?/g, replace: 'bg-[#B8860B]$1' },
    { regex: /from-\[\#1e3a8a\](\/\d+)?/g, replace: 'from-[#B8860B]$1' },
    { regex: /shadow-\[\#1e3a8a\](\/\d+)?/g, replace: 'shadow-[#B8860B]$1' },

    // Standard Blues to Golds
    { regex: /bg-blue-600(\/\d+)?/g, replace: 'bg-[#D4AF37]$1' },
    { regex: /text-blue-600(\/\d+)?/g, replace: 'text-[#D4AF37]$1' },
    { regex: /border-blue-600(\/\d+)?/g, replace: 'border-[#D4AF37]$1' },
    
    { regex: /text-blue-500(\/\d+)?/g, replace: 'text-[#F3CA3E]$1' },
    { regex: /bg-blue-500(\/\d+)?/g, replace: 'bg-[#F3CA3E]$1' },
    
    { regex: /text-blue-400(\/\d+)?/g, replace: 'text-[#FDE047]$1' },
    { regex: /bg-blue-400(\/\d+)?/g, replace: 'bg-[#FDE047]$1' },
    
    { regex: /text-blue-700(\/\d+)?/g, replace: 'text-[#B8860B]$1' },
    { regex: /bg-blue-700(\/\d+)?/g, replace: 'bg-[#B8860B]$1' },
    { regex: /to-blue-400(\/\d+)?/g, replace: 'to-[#FDE047]$1' },
    { regex: /from-blue-700(\/\d+)?/g, replace: 'from-[#B8860B]$1' },
    { regex: /text-blue-900(\/\d+)?/g, replace: 'text-[#8B6508]$1' },
    { regex: /shadow-blue-900(\/\d+)?/g, replace: 'shadow-[#8B6508]$1' }
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
let changedFilesCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    replacements.forEach(({ regex, replace }) => {
        content = content.replace(regex, replace);
    });

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        changedFilesCount++;
        console.log(`Updated: ${path.basename(file)}`);
    }
});

console.log(`\n✅ Deep Theme pass 2 complete. Changed ${changedFilesCount} files.`);
