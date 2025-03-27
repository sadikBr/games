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
var previous_moves: Array

func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("click"):
		# Clear previous moves
		for move in previous_moves:
			set_cell(move.position, -1, Vector2i(0, 0))
		
		var board_coordinates = local_to_map(get_local_mouse_position())
		var atlas_coordinates = get_cell_atlas_coords(board_coordinates)
		
		# Set the variable values
		piece = atlas_coordinates.x
		white = atlas_coordinates.y == 1
		
		# Get all possible moves after click
		var moves = []
		
		match piece:
			0: moves = get_queen_moves(board_coordinates, white)
			1: moves = get_king_moves(board_coordinates, white)
			2: moves = get_rook_moves(board_coordinates, white)
			3: moves = get_knight_moves(board_coordinates, white)
			4: moves = get_bishop_moves(board_coordinates, white)
			5: moves = get_pawn_moves(board_coordinates, white)
		
		previous_moves = moves
		draw_moves(moves)

func _is_enemy(target_pos: Vector2, is_white: bool) -> bool:
	var is_enemy = false
	var piece_color = 1 if is_white else 0
	if _is_valid_move(target_pos, is_white):
		var atlas_coordinates = get_cell_atlas_coords(target_pos)
		if atlas_coordinates.y != -1 and atlas_coordinates.y != piece_color:
			is_enemy = true
	return is_enemy

func _is_valid_move(target_pos: Vector2, is_white: bool) -> bool:
	var piece_color = 1 if is_white else 0
	var atlas_coordinates = get_cell_atlas_coords(target_pos)
	
	var valid_move = true
	if atlas_coordinates.y == piece_color:
		valid_move = false
	
	return valid_move

func get_pawn_moves(pos: Vector2, is_white: bool) -> Array:
	var _moves: Array = []
	var pawn_first_move = false
	if pos.y == 6 or pos.y == 1:
		pawn_first_move = true
	
	# The pawn can only move forward by one cell, or two if its the first move
	# It can't move if it has another piece from the same player is in front of it
	# If an enemy piece is in front of it, it can catch it.
	
	var target_position = Vector2(pos.x, pos.y - (1 * 1 if is_white else -1))
	if not _is_valid_move(target_position, white):
		return _moves
	else:
		var is_enemy = _is_enemy(target_position, white)
		_moves.append({ "position": target_position, "is_enemy": is_enemy })
		
		if is_enemy:
			return _moves
	
	if pawn_first_move:
		target_position = Vector2(pos.x, pos.y - (2 * (1 if is_white else -1)))
		if _is_valid_move(target_position, white):
			_moves.append({ "position": target_position, "is_enemy": _is_enemy(target_position, white) })
	
	return _moves

func get_rook_moves(pos: Vector2, is_white: bool) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Rook clicked", pos)
	return []

func get_bishop_moves(pos: Vector2, is_white: bool) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Bishop clicked", pos)
	return []

func get_queen_moves(pos: Vector2, is_white: bool) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Queen clicked", pos)
	return []

func get_knight_moves(pos: Vector2, is_white: bool) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("Knight clicked", pos)
	return []

func get_king_moves(pos: Vector2, is_white: bool) -> Array[Vector2]:
	var _moves: Array[Vector2] = []
	print("King clicked", pos)
	return []

func draw_moves(moves: Array) -> void:
	for move in moves:
		set_cell(move.position, POSSIBLE_CATCH if move.is_enemy else POSSIBLE_MOVE_TILESET, Vector2i(0, 0))
