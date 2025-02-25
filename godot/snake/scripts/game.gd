extends Node

@export var snake_scene: PackedScene
@onready var hud: CanvasLayer = $Hud
@onready var move_timer: Timer = $MoveTimer
@onready var apple: Sprite2D = $Apple
@onready var game_over_menu: CanvasLayer = $GameOverMenu

# Game variables
var score: int
var game_started: bool = false

# Grid variables
var cells: int = 20
var cell_size: int = 50

# Apple variables
var apple_position: Vector2
var regenerate_apple: bool = true

# Snake variables
var old_data: Array
var snake_data: Array
var snake: Array

# Movement variables
var start_position: Vector2 = Vector2(9, 9)
var can_move: bool
var move_direction: Vector2
var up: Vector2 = Vector2(0, -1)
var down: Vector2 = Vector2(0, 1)
var left: Vector2 = Vector2(-1, 0)
var right: Vector2 = Vector2(1, 0)

# Custom Functions
func add_segment(pos) -> void:
	snake_data.append(pos)
	var SnakeSegment = snake_scene.instantiate()
	SnakeSegment.position = (pos * cell_size) + Vector2(0, cell_size)
	add_child(SnakeSegment)
	snake.append(SnakeSegment)

func generate_snake() -> void:
	old_data.clear()
	snake_data.clear()
	snake.clear()
	for i in range(3):
		add_segment(start_position + Vector2(0, i))

func move_apple() -> void:
	while regenerate_apple:
		regenerate_apple = false
		apple_position = Vector2(randi_range(0, cells - 1), randi_range(0, cells - 1))
		for i in snake_data:
			if apple_position == i:
				regenerate_apple = true
	apple.position = (apple_position * cell_size) + Vector2(0, cell_size)
	regenerate_apple = true

func update_score() -> void:
	hud.get_node("ScoreLabel").text = "Score: " + str(score)

func new_game() -> void:
	get_tree().paused = false
	get_tree().call_group("segments", "queue_free")
	game_over_menu.hide()
	score = 0
	update_score()
	move_direction = up
	can_move = true
	generate_snake()
	move_apple()

func move_snake() -> void:
	if can_move:
		if Input.is_action_just_pressed("down") and move_direction != up:
			move_direction = down
			can_move = false
			if not game_started:
				start_game()
		if Input.is_action_just_pressed("up") and move_direction != down:
			move_direction = up
			can_move = false
			if not game_started:
				start_game()
		if Input.is_action_just_pressed("left") and move_direction != right:
			move_direction = left
			can_move = false
			if not game_started:
				start_game()
		if Input.is_action_just_pressed("right") and move_direction != left:
			move_direction = right
			can_move = false
			if not game_started:
				start_game()

func start_game() -> void:
	game_started = true
	move_timer.start()

func end_game() -> void:
	game_over_menu.show()
	move_timer.stop()
	game_started = false
	get_tree().paused = true

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	new_game()

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	move_snake()

func check_out_of_bounds() -> void:
	if snake_data[0].x < 0 or snake_data[0].x > cells - 1 or snake_data[0].y < 0 or snake_data[0].y > cells - 1:
		end_game()

func check_self_eaten() -> void:
	for i in range(1, len(snake_data)):
		if snake_data[0] == snake_data[i]:
			end_game()

func check_apple_eaten() -> void:
	if snake_data[0] == apple_position:
		add_segment(old_data[-1])
		score += 1
		update_score()
		move_apple()

func _on_move_timer_timeout() -> void:
	can_move = true
	old_data = [] + snake_data
	snake_data[0] += move_direction
	for i in range(len(snake_data)):
		if i > 0:
			snake_data[i] = old_data[i - 1]
		snake[i].position = (snake_data[i] * cell_size) + Vector2(0, cell_size)
	check_out_of_bounds()
	check_self_eaten()
	check_apple_eaten()

func _on_game_over_menu_restart() -> void:
	new_game()
