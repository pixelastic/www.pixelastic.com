const fs = require('fs');
const path = require('path');

// Read the talks.json file
const talksPath = path.join(__dirname, 'src/_data/talks.json');
const talks = JSON.parse(fs.readFileSync(talksPath, 'utf8'));

// Function to parse the "when" field into a comparable date
/**
 * @param whenString
 */
function parseWhen(whenString) {
  if (!whenString) {
    return new Date(0); // Default to epoch for missing dates
  }

  // Extract month and year from strings like "October 2025", "November 2024", etc.
  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
    janvier: 0,
    février: 1,
    mars: 2,
    avril: 3,
    mai: 4,
    juin: 5,
    juillet: 6,
    août: 7,
    septembre: 8,
    octobre: 9,
    novembre: 10,
    décembre: 11,
  };

  const lowerWhen = whenString.toLowerCase().trim();

  // Try to match "Month Year" format
  const match = lowerWhen.match(/([a-zéû]+)\s+(\d{4})/);

  if (match) {
    const monthName = match[1];
    const year = parseInt(match[2], 10);
    const month = months[monthName];

    if (month !== undefined) {
      return new Date(year, month, 1);
    }
  }

  // Fallback: if we can't parse, return epoch
  return new Date(0);
}

// Sort talks by date (newest first)
talks.sort((a, b) => {
  const dateA = parseWhen(a.when);
  const dateB = parseWhen(b.when);

  // Sort descending (newest first)
  return dateB - dateA;
});

// Write the sorted talks back to the file
fs.writeFileSync(talksPath, JSON.stringify(talks, null, 2) + '\n', 'utf8');

console.log('Talks sorted successfully by chronological order (newest first)!');
