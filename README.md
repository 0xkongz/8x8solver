# 8x8 Block Puzzle Solver

A sophisticated web-based puzzle solver for 8x8 block puzzles with drag-and-drop editing, intelligent solving algorithms, and step-by-step solution visualization.

🌐 **Live Demo**: https://0xkongz.github.io/8x8solver/

## ✨ Features

### 🎮 Interactive Board Editor
- **Click & Drag**: Paint cells by clicking and dragging across the 8x8 board
- **Smart Fill/Clear**: Automatically detects whether to fill or clear cells based on starting position
- **Quick Setup**: Random board generation and clear board functionality

### 🧩 Piece Management
- **Three Piece Slots**: Manage up to 3 puzzle pieces simultaneously
- **Drag Editing**: Click and drag to edit piece shapes directly
- **Random Generation**: Generate random pieces from a library of common tetris-like shapes
- **Custom Piece Creator**: Design your own pieces with a dedicated 5x5 editor

### 🤖 Advanced Solver
- **Intelligent Algorithm**: Uses backtracking with piece permutation to find optimal solutions
- **Strategic Ordering**: Automatically determines the best order to place pieces
- **Line Clearing**: Considers horizontal and vertical line clearing mechanics
- **High Success Rate**: Solves complex puzzles that require strategic piece ordering

### 📊 Solution Visualization
- **Step-by-Step Playback**: Navigate through the solution with next/previous controls
- **Visual Highlighting**: Color-coded pieces with distinct visual styles
- **Placement Memory**: Outlines show where pieces were placed even after line clearing
- **Detailed Information**: Shows piece positions, line clearing counts, and current step

## 🚀 Quick Start

1. **Open the Application**: Load `index.html` in your web browser
2. **Set Up Your Puzzle**: Use drag-and-drop to edit the board and pieces
3. **Solve**: Click "Solve Puzzle" to find the optimal solution
4. **Navigate**: Use step controls to understand the solving strategy

## 📖 How to Use

### Setting Up a Puzzle

#### Board Editor
- **Click and Drag**: Paint multiple cells at once by dragging
- **Fill Mode**: Start on an empty cell to fill cells
- **Clear Mode**: Start on a filled cell to clear cells
- **Random Setup**: Use "Random Setup" button for quick board generation

#### Piece Configuration
- **Edit Existing Pieces**: Click and drag on any of the three piece grids
- **Random Pieces**: Click "Random 3 Pieces" for instant piece generation
- **Custom Creation**: Use the Piece Creator section to design unique pieces
- **Replace Pieces**: Select which piece slot to replace with your custom creation

### Solving Process

1. **Initiate Solving**: Click "Solve Puzzle" button
2. **Wait for Solution**: The algorithm explores all possible piece orders
3. **Navigate Results**: 
   - Use "Next Step" to see each piece placement
   - Use "Previous Step" to review earlier moves
   - Observe how line clearing creates space for subsequent pieces

### Understanding the Visualization

#### Color Coding
- 🔴 **Red**: Piece 1
- 🟢 **Green**: Piece 2  
- 🔵 **Blue**: Piece 3

#### Visual Indicators
- **Solid Colors**: Pieces currently on the board
- **Colored Outlines**: Show where pieces were placed before line clearing
- **Step Cards**: Detailed information about each placement

## 🛠️ Technical Implementation

### Core Algorithm
The solver uses an advanced backtracking algorithm featuring:

```javascript
// Key innovation: Tries all piece orders, not just sequential
for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
    const currentPiece = pieces[pieceIndex];
    const remainingPieces = pieces.filter((_, index) => index !== pieceIndex);
    // ... placement logic
}
```

**Why This Matters**: Some puzzles require placing smaller pieces first to clear lines and create space for larger pieces.

### File Structure
```
8x8solver/
├── index.html          # Main application interface
├── script.js           # Solver logic and UI controls
├── style.css           # Visual styling and animations
└── README.md           # Documentation (this file)
```

### Key Components

#### BlockPuzzleSolver Class
- **State Management**: Tracks board, pieces, and solution states
- **Event Handling**: Manages drag-and-drop interactions
- **Algorithm Core**: Implements the backtracking solver

#### Drag System
- **Multi-target Support**: Works on board, pieces, and creator
- **Smart Mode Detection**: Automatically determines fill vs clear mode
- **Visual Feedback**: Cursor changes and hover effects

#### Solution Engine
- **Permutation Search**: Tries all possible piece orders
- **Line Clearing Integration**: Considers clearing effects in placement strategy
- **Step Reconstruction**: Builds detailed solution path for visualization

## 🌟 Advanced Features

### Smart Solving Strategy
The solver doesn't just try pieces in order (1→2→3). Instead, it explores all permutations:
- **Standard Order**: 1→2→3
- **Alternative Orders**: 2→3→1, 3→1→2, etc.
- **Strategic Selection**: Finds the order that actually works

### Line Clearing Intelligence
- **Horizontal Clearing**: Detects and clears complete rows
- **Vertical Clearing**: Detects and clears complete columns
- **Strategic Usage**: Uses line clearing to create space for remaining pieces

### Visual Memory System
When pieces get cleared by line clearing, the system shows:
- **Placement Outlines**: Border highlights where pieces were originally placed
- **Color Persistence**: Maintains piece color coding even after clearing
- **Step Information**: Details about how many lines were cleared

## 💻 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 60+     | ✅ Full Support |
| Firefox | 55+     | ✅ Full Support |
| Safari  | 12+     | ✅ Full Support |
| Edge    | 79+     | ✅ Full Support |

## 🎯 Usage Examples

### Example 1: Basic Puzzle
```
1. Start with empty board
2. Click "Random 3 Pieces"
3. Click "Solve Puzzle"
4. Navigate through solution steps
```

### Example 2: Strategic Challenge
```
1. Create a board with strategic gaps
2. Design custom pieces that require specific ordering
3. Observe how the solver finds the optimal sequence
4. Use step navigation to understand the strategy
```

### Example 3: Learning Mode
```
1. Set up a challenging configuration
2. Try to solve mentally first
3. Use the solver to see the actual solution
4. Compare strategies and learn new techniques
```

## 🔧 Customization

### Adding New Piece Shapes
Edit the `commonPieces` array in `script.js`:
```javascript
const commonPieces = [
    // Add your custom piece pattern
    [[true, false, true], [true, true, true]]
];
```

### Modifying Board Size
To change from 8x8 to another size, update:
1. Board creation loops in `createBoard()`
2. Solver boundary checks in `canPlacePiece()`
3. CSS grid template in `style.css`

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Issues**: Found a bug? Open an issue with details
2. **Suggest Features**: Have ideas for improvements? We'd love to hear them
3. **Submit Code**: Fork, improve, and create a pull request
4. **Improve Documentation**: Help make the README even better

## 📄 License

This project is open source and available under the MIT License.

## 🎮 Fun Facts

- The solver can handle puzzles where pieces must be placed out of order
- Line clearing is used strategically, not just as a side effect
- The drag system works on both desktop and touch devices
- Visual outlines ensure you never lose track of piece placements
- The algorithm typically finds solutions in milliseconds

## 🚀 Future Enhancements

- **Piece Rotation**: Add support for rotating pieces before placement
- **Larger Boards**: Support for 10x10, 12x12 grids
- **Save/Load**: Persist puzzle configurations
- **Multiplayer**: Competitive solving challenges
- **Mobile App**: Native mobile application
- **AI Hints**: Intelligent placement suggestions

---

**Ready to solve some puzzles?** 🧩 Open `index.html` and start creating!
