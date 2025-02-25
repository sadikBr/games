extends CharacterBody2D

const SPEED = 300
const FLY_VELOCITY = -300
const ROTATION_SPEED = .04

var falling = true

func _ready() -> void:
	set_rotation(0)

func _physics_process(delta: float) -> void:
	# Add the gravity.
	if not is_on_floor() and get_parent().game_started:
		velocity += get_gravity() * delta

	# Handle jump.
	if Input.is_action_just_pressed("flap") and not is_on_floor():
		velocity.y = FLY_VELOCITY
		falling = false

	if Input.is_action_just_released("flap"):
		falling = true

	# Rotate the bird based on its state
	if get_parent().game_started:
		if falling:
			var new_rotation = rotation + ROTATION_SPEED
			set_rotation(min(new_rotation, PI/4))
		else:
			set_rotation(-PI/4)

	# Move the bird
	move_and_slide()
