extends Node

@onready var player_area: Panel = $PlayerArea
@onready var player: CharacterBody2D = $Player

@export var enemy_scene: PackedScene
@export var enemy_damage: int = 1
@onready var enemies: Node = $Enemies

@export var PLAYER_AREA_SIZE_SCALE: float = 1.0
@export var PLAYER_SIZE_SCALE: float = 1.0

func _ready() -> void:
	player.scale = Vector2(PLAYER_SIZE_SCALE, PLAYER_SIZE_SCALE)
	player_area.scale = Vector2(PLAYER_AREA_SIZE_SCALE, PLAYER_AREA_SIZE_SCALE)
	
	MainMusic.play()
	Engine.time_scale = 1.0
	spawn_enemy()

func damage_player():
	var player_shape = player.get_node("PlayerShape")
	player_shape.value -= enemy_damage
	
	if player_shape.value == 0:
		await get_tree().create_timer(0.1).timeout
		game_over()

func game_over():
	# TODO: Make this function better (maybe open a store to do some upgrades)
	get_tree().reload_current_scene()
	MainMusic.stop()

func get_random_position() -> Vector2:
	var x = randi_range(-100, 2000)
	var y = -75 if randf() < 0.5 else 1200
	return Vector2(x, y)

func spawn_enemy():
	var enemy = enemy_scene.instantiate()
	enemy.position = get_random_position()
	enemy.add_to_group("enemies")
	enemies.add_child(enemy)

func _on_enemy_spawner_timeout() -> void:
	spawn_enemy()
