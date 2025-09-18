using Godot;

public partial class Player : Area2D
{
    private AudioStreamPlayer ScoreSound;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        ScoreSound = GetNode<AudioStreamPlayer>("ScoreSound");
    }

    public void UpdatePaddlePosition(float NewPositionY)
    {
        Position = new Vector2(Position.X, NewPositionY);
    }

    public void PlayScoreSound()
    {
        ScoreSound.Play();
    }
}
