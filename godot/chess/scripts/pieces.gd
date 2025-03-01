extends TileMapLayer

# How to determine which piece are you working with.
# White or Black piece is determined by the y value of the coordinates: 0 => Black; 1 => White
# For each piece: 0 => Queen; 1 => King; 2 => Rook; 3 => Knight; 4 => Bishop; 5 => Pawn

# Tilesets IDs
const PIECES_TILESET = 0
const POSSIBLE_MOVE_TILESET = 1
const POSSIBLE_CATCH = 2

var white: bool = true
var piece: int

func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("click"):
		var board_coordinates = local_to_map(get_local_mouse_position())
		var atlas_coordinates = get_cell_atlas_coords(board_coordinates)
		
		# Set the variable values
		piece = atlas_coordinates.x
		white = atlas_coordinates.y == 1
		
		# Get all possible moves after click
		var moves = []
		
		match piece:
			0: moves = get_queen_moves(board_coordinates)
			1: moves = get_king_moves(board_coordinates)
			2: moves = get_rook_moves(board_coordinates)
			3: moves = get_knight_moves(board_coordinates)
			4: moves = get_bishop_moves(board_coordinates)
			5: moves = get_pawn_moves(board_coordinates)
		
		print(moves)

func _is_enemy(initial_pos, target_pos):
	pass

func _is_valid_move(initial_pos, target_pos):
	pass

func get_pawn_moves(pos: Vector2) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	var pawn_first_move = false
	if pos.y == 6 or pos.y == 1:
		pawn_first_move = true
	
	# The pawn can only move forward by one cell, or two if its the first move
	# It can't move if it has another piece from the same player is in front of it
	# If an enemy piece is in front of it, it can catch it.
	
	_moves.append(Vector2(pos.x, pos.y - 1))
	
	if pawn_first_move:
		_moves.append(Vector2(pos.x, pos.y - 2))
	
	return _moves

func get_rook_moves(pos: Vector2) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Rook clicked", pos)
	return []

func get_bishop_moves(pos: Vector2) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Bishop clicked", pos)
	return []

func get_queen_moves(pos: Vector2) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Queen clicked", pos)
	return []

func get_knight_moves(pos: Vector2) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Knight clicked", pos)
	return []

func get_king_moves(pos: Vector2) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("King clicked", pos)
	return []
