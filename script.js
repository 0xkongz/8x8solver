class BlockPuzzleSolver {
    constructor() {
        this.board = Array(8).fill().map(() => Array(8).fill(false));
        this.originalBoard = null; // Store original board state when solution starts
        this.pieces = [[], [], []];
        this.solution = null;
        this.currentStep = 0;
        this.creatorPiece = Array(5).fill().map(() => Array(5).fill(false));
        
        this.initializeUI();
        this.setupEventListeners();
        this.generateRandomPieces();
    }

    initializeUI() {
        this.createBoard();
        this.createPieceGrids();
        this.createPieceCreator();
    }

    createBoard() {
        const boardElement = document.getElementById('gameBoard');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'board-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.toggleBoardCell(row, col));
                boardElement.appendChild(cell);
            }
        }
    }

    createPieceGrids() {
        for (let pieceIndex = 0; pieceIndex < 3; pieceIndex++) {
            const pieceElement = document.getElementById(`piece${pieceIndex}`);
            pieceElement.innerHTML = '';
            
            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 5; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'piece-cell';
                    cell.dataset.row = row;
                    cell.dataset.col = col;
                    cell.addEventListener('click', () => this.togglePieceCell(pieceIndex, row, col));
                    pieceElement.appendChild(cell);
                }
            }
        }
    }

    createPieceCreator() {
        const creatorElement = document.getElementById('pieceCreator');
        creatorElement.innerHTML = '';
        
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                const cell = document.createElement('div');
                cell.className = 'piece-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.toggleCreatorCell(row, col));
                creatorElement.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        document.getElementById('clearBoard').addEventListener('click', () => this.clearBoard());
        document.getElementById('randomBoard').addEventListener('click', () => this.randomBoard());
        document.getElementById('randomPieces').addEventListener('click', () => this.generateRandomPieces());
        document.getElementById('clearPieces').addEventListener('click', () => this.clearPieces());
        document.getElementById('createPiece').addEventListener('click', () => this.createCustomPiece());
        document.getElementById('clearCreator').addEventListener('click', () => this.clearCreator());
        document.getElementById('solveButton').addEventListener('click', () => this.solvePuzzle());
        document.getElementById('nextStep').addEventListener('click', () => this.nextStep());
        document.getElementById('prevStep').addEventListener('click', () => this.prevStep());
        document.getElementById('resetSolution').addEventListener('click', () => this.resetSolution());
    }

    toggleBoardCell(row, col) {
        this.board[row][col] = !this.board[row][col];
        this.updateBoardDisplay();
    }

    togglePieceCell(pieceIndex, row, col) {
        if (!this.pieces[pieceIndex][row]) {
            this.pieces[pieceIndex][row] = Array(5).fill(false);
        }
        this.pieces[pieceIndex][row][col] = !this.pieces[pieceIndex][row][col];
        this.updatePieceDisplay(pieceIndex);
    }

    toggleCreatorCell(row, col) {
        this.creatorPiece[row][col] = !this.creatorPiece[row][col];
        this.updateCreatorDisplay();
    }

    updateBoardDisplay() {
        const cells = document.querySelectorAll('#gameBoard .board-cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.className = 'board-cell';
            if (this.board[row][col]) {
                cell.classList.add('filled');
            }
        });
    }

    updatePieceDisplay(pieceIndex) {
        const cells = document.querySelectorAll(`#piece${pieceIndex} .piece-cell`);
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.className = 'piece-cell';
            if (this.pieces[pieceIndex][row] && this.pieces[pieceIndex][row][col]) {
                cell.classList.add('filled');
            }
        });
    }

    updateCreatorDisplay() {
        const cells = document.querySelectorAll('#pieceCreator .piece-cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.className = 'piece-cell';
            if (this.creatorPiece[row][col]) {
                cell.classList.add('filled');
            }
        });
    }

    clearBoard() {
        this.board = Array(8).fill().map(() => Array(8).fill(false));
        this.updateBoardDisplay();
        this.resetSolution();
    }

    randomBoard() {
        this.board = Array(8).fill().map(() => Array(8).fill().map(() => Math.random() < 0.3));
        this.updateBoardDisplay();
        this.resetSolution();
    }

    clearPieces() {
        this.pieces = [[], [], []];
        for (let i = 0; i < 3; i++) {
            this.updatePieceDisplay(i);
        }
        this.resetSolution();
    }

    clearCreator() {
        this.creatorPiece = Array(5).fill().map(() => Array(5).fill(false));
        this.updateCreatorDisplay();
    }

    createCustomPiece() {
        const targetSlot = parseInt(document.getElementById('targetPieceSlot').value);
        this.pieces[targetSlot] = this.creatorPiece.map(row => [...row]);
        this.updatePieceDisplay(targetSlot);
        this.resetSolution();
    }

    generateRandomPieces() {
        const commonPieces = [
            // Single block
            [[true]],
            // 2x1 block
            [[true, true]],
            // L-shapes
            [[true, false], [true, true]],
            [[true, true], [true, false]],
            // 3x1 block
            [[true, true, true]],
            // T-shape
            [[true, true, true], [false, true, false]],
            // 2x2 square
            [[true, true], [true, true]],
            // 3x3 square
            [[true, true, true], [true, true, true], [true, true, true]],
            // Plus shape
            [[false, true, false], [true, true, true], [false, true, false]],
            // Z-shapes
            [[true, true, false], [false, true, true]],
            [[false, true, true], [true, true, false]]
        ];

        for (let i = 0; i < 3; i++) {
            const randomPiece = commonPieces[Math.floor(Math.random() * commonPieces.length)];
            this.pieces[i] = Array(5).fill().map(() => Array(5).fill(false));
            
            // Center the piece in the 5x5 grid
            const startRow = Math.floor((5 - randomPiece.length) / 2);
            const startCol = Math.floor((5 - randomPiece[0].length) / 2);
            
            for (let row = 0; row < randomPiece.length; row++) {
                for (let col = 0; col < randomPiece[row].length; col++) {
                    this.pieces[i][startRow + row][startCol + col] = randomPiece[row][col];
                }
            }
            
            this.updatePieceDisplay(i);
        }
        this.resetSolution();
    }

    // Convert piece to compact format (remove empty rows/cols)
    getCompactPiece(piece) {
        const filledCells = [];
        for (let row = 0; row < piece.length; row++) {
            for (let col = 0; col < piece[row].length; col++) {
                if (piece[row][col]) {
                    filledCells.push([row, col]);
                }
            }
        }
        
        if (filledCells.length === 0) return [];
        
        const minRow = Math.min(...filledCells.map(([r, c]) => r));
        const minCol = Math.min(...filledCells.map(([r, c]) => c));
        
        return filledCells.map(([r, c]) => [r - minRow, c - minCol]);
    }

    // Check if piece can be placed at position
    canPlacePiece(board, piece, startRow, startCol) {
        const compactPiece = this.getCompactPiece(piece);
        
        for (const [row, col] of compactPiece) {
            const boardRow = startRow + row;
            const boardCol = startCol + col;
            
            if (boardRow < 0 || boardRow >= 8 || boardCol < 0 || boardCol >= 8) {
                return false;
            }
            
            if (board[boardRow][boardCol]) {
                return false;
            }
        }
        
        return true;
    }

    // Place piece on board
    placePiece(board, piece, startRow, startCol) {
        const newBoard = board.map(row => [...row]);
        const compactPiece = this.getCompactPiece(piece);
        
        for (const [row, col] of compactPiece) {
            newBoard[startRow + row][startCol + col] = true;
        }
        
        return newBoard;
    }

    // Clear complete lines
    clearLines(board) {
        let newBoard = board.map(row => [...row]);
        let clearedLines = 0;
        
        // Clear horizontal lines
        for (let row = 0; row < 8; row++) {
            if (newBoard[row].every(cell => cell)) {
                newBoard[row] = Array(8).fill(false);
                clearedLines++;
            }
        }
        
        // Clear vertical lines
        for (let col = 0; col < 8; col++) {
            if (newBoard.every(row => row[col])) {
                for (let row = 0; row < 8; row++) {
                    newBoard[row][col] = false;
                }
                clearedLines++;
            }
        }
        
        return { board: newBoard, clearedLines };
    }

    // Backtracking solver
    solve(board, pieces, placedPieces = []) {
        if (pieces.length === 0) {
            return { success: true, moves: placedPieces };
        }
        
        const currentPiece = pieces[0];
        const remainingPieces = pieces.slice(1);
        
        // Try placing the piece at every possible position
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.canPlacePiece(board, currentPiece, row, col)) {
                    const newBoard = this.placePiece(board, currentPiece, row, col);
                    const { board: clearedBoard, clearedLines } = this.clearLines(newBoard);
                    
                    const move = {
                        piece: currentPiece,
                        position: [row, col],
                        pieceIndex: placedPieces.length,
                        clearedLines,
                        boardAfter: clearedBoard
                    };
                    
                    const result = this.solve(clearedBoard, remainingPieces, [...placedPieces, move]);
                    if (result.success) {
                        return result;
                    }
                }
            }
        }
        
        return { success: false, moves: [] };
    }

    solvePuzzle() {
        // Filter out empty pieces
        const validPieces = this.pieces.filter(piece => 
            piece.some(row => row.some(cell => cell))
        );
        
        if (validPieces.length === 0) {
            document.getElementById('solutionInfo').innerHTML = 
                '<div style="color: #ff6b6b;">No pieces to solve!</div>';
            return;
        }
        
        // Store the original board state
        this.originalBoard = this.board.map(row => [...row]);
        
        document.getElementById('solutionInfo').innerHTML = 
            '<div style="color: #4CAF50;">Solving... Please wait.</div>';
        
        setTimeout(() => {
            const result = this.solve(this.board, validPieces);
            
            if (result.success) {
                this.solution = result.moves;
                this.currentStep = 0;
                this.displaySolution();
            } else {
                document.getElementById('solutionInfo').innerHTML = 
                    '<div style="color: #ff6b6b;">No solution found! Try a different configuration.</div>';
                document.getElementById('solutionSteps').innerHTML = '';
                this.originalBoard = null;
            }
        }, 100);
    }

    displaySolution() {
        const info = document.getElementById('solutionInfo');
        info.innerHTML = `
            <div style="color: #4CAF50;">
                <strong>Solution Found!</strong><br>
                ${this.solution.length} pieces to place<br>
                Step ${this.currentStep + 1} of ${this.solution.length}
            </div>
        `;
        
        const steps = document.getElementById('solutionSteps');
        steps.innerHTML = '';
        
        this.solution.forEach((move, index) => {
            const stepCard = document.createElement('div');
            stepCard.className = 'step-card';
            if (index === this.currentStep) {
                stepCard.style.borderLeftColor = '#FFD700';
                stepCard.style.background = 'rgba(255, 215, 0, 0.1)';
            }
            
            stepCard.innerHTML = `
                <h4>Step ${index + 1}: Place Piece ${move.pieceIndex + 1}</h4>
                <p>Position: Row ${move.position[0] + 1}, Column ${move.position[1] + 1}</p>
                <p>Lines cleared: ${move.clearedLines}</p>
                <div class="step-preview" id="preview-${index}"></div>
            `;
            
            steps.appendChild(stepCard);
            
            // Create preview
            this.createStepPreview(index, move.boardAfter);
        });
        
        this.showCurrentStep();
    }

    createStepPreview(stepIndex, board) {
        const preview = document.getElementById(`preview-${stepIndex}`);
        preview.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'preview-cell';
                if (board[row][col]) {
                    cell.classList.add('filled');
                }
                preview.appendChild(cell);
            }
        }
    }

    showCurrentStep() {
        if (!this.solution || this.solution.length === 0 || !this.originalBoard) return;
        
        // Start with the original board state
        let currentBoard = this.originalBoard.map(row => [...row]);
        
        // Apply all moves up to and including the current step
        for (let i = 0; i <= this.currentStep && i < this.solution.length; i++) {
            const move = this.solution[i];
            const compactPiece = this.getCompactPiece(move.piece);
            
            // Place the piece on the current board
            compactPiece.forEach(([row, col]) => {
                const boardRow = move.position[0] + row;
                const boardCol = move.position[1] + col;
                if (boardRow >= 0 && boardRow < 8 && boardCol >= 0 && boardCol < 8) {
                    currentBoard[boardRow][boardCol] = true;
                }
            });
            
            // Apply line clearing if this is the current step or earlier
            const { board: clearedBoard } = this.clearLines(currentBoard);
            currentBoard = clearedBoard;
        }
        
        // Update the actual board state with accumulated moves
        this.board = currentBoard.map(row => [...row]);
        
        // Update display with the accumulated board state
        const cells = document.querySelectorAll('#gameBoard .board-cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.className = 'board-cell';
            if (this.board[row][col]) {
                cell.classList.add('filled');
            }
        });
        
        // Highlight the current step's piece if we're not at the end
        if (this.currentStep < this.solution.length) {
            const currentMove = this.solution[this.currentStep];
            const compactPiece = this.getCompactPiece(currentMove.piece);
            
            compactPiece.forEach(([row, col]) => {
                const boardRow = currentMove.position[0] + row;
                const boardCol = currentMove.position[1] + col;
                const cell = document.querySelector(`[data-row="${boardRow}"][data-col="${boardCol}"]`);
                if (cell && this.board[boardRow][boardCol]) {
                    cell.classList.add(`solution-step-${currentMove.pieceIndex + 1}`);
                }
            });
            
            // Update info
            document.getElementById('solutionInfo').innerHTML = `
                <div style="color: #4CAF50;">
                    <strong>Solution Found!</strong><br>
                    ${this.solution.length} pieces to place<br>
                    Step ${this.currentStep + 1} of ${this.solution.length}<br>
                    <strong>Current:</strong> Place Piece ${currentMove.pieceIndex + 1} at Row ${currentMove.position[0] + 1}, Column ${currentMove.position[1] + 1}
                </div>
            `;
        } else {
            // All steps completed
            document.getElementById('solutionInfo').innerHTML = `
                <div style="color: #4CAF50;">
                    <strong>Solution Completed!</strong><br>
                    All ${this.solution.length} pieces placed successfully!<br>
                    Board is ready for the next round.
                </div>
            `;
        }
    }

    nextStep() {
        if (this.solution && this.currentStep < this.solution.length - 1) {
            this.currentStep++;
            this.showCurrentStep();
            this.updateStepHighlight();
        }
    }

    prevStep() {
        if (this.solution && this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
            this.updateStepHighlight();
        }
    }

    updateStepHighlight() {
        const stepCards = document.querySelectorAll('.step-card');
        stepCards.forEach((card, index) => {
            if (index === this.currentStep) {
                card.style.borderLeftColor = '#FFD700';
                card.style.background = 'rgba(255, 215, 0, 0.1)';
            } else {
                card.style.borderLeftColor = '#4CAF50';
                card.style.background = 'rgba(0,0,0,0.2)';
            }
        });
    }

    resetSolution() {
        this.solution = null;
        this.currentStep = 0;
        this.originalBoard = null;
        document.getElementById('solutionInfo').innerHTML = '';
        document.getElementById('solutionSteps').innerHTML = '';
        
        // Reset board display
        this.updateBoardDisplay();
    }
}

// Initialize the solver when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BlockPuzzleSolver();
});
