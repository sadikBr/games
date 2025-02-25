extends CharacterBody2D

@onready var player: StaticBody2D = $"../Player"
@onready var ai: StaticBody2D = $"../AI"
@onready var borders: StaticBody2D = $"../Borders"

var window_size: Vector2

const BALL_START_SPEED: int = 500
const BALL_ACCELERATION: int = 50

var speed: int
var direction: Vector2

func _ready() -> void:
	window_size = get_viewport_rect().size

func get_random_direction() -> Vector2:
	return Vector2([1, -1].pick_random(), randf_range(-1, 1)).normalized()

func new_ball() -> void:
	# Randomize start position and direction.
	position = Vector2(window_size.x / 2, randi_range(250, window_size.y - 250))
	speed = BALL_START_SPEED
	direction = get_random_direction()

func _physics_process(delta: float) -> void:
	var collision = move_and_collide(direction * speed * delta)
	if collision:
		var collider = collision.get_collider()
		if collider == player or collider == ai:
			direction = direction.bounce(collision.get_normal())
			speed += BALL_ACCELERATION
		if collider == borders:
			direction = direction.bounce(collision.get_normal())
