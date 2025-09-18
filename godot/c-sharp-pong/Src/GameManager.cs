using Godot;
using System.Collections.Generic;

public partial class GameManager : Node2D
{
    private Dictionary<string, int> Scores = new Dictionary<string, int>{
      { "Human", 0 },
      { "Computer", 0 }
    };

    private Label HumanScoreLabel;
    private Label ComputerScoreLabel;

    private bool IsMoving = false;

    public override void _Ready()
    {
        HumanScoreLabel = GetNode<Label>("Scores/HumanScore");
        ComputerScoreLabel = GetNode<Label>("Scores/ComputerScore");
    }

    public override void _Process(double delta)
    {
        GetNode<Label>("PauseMessage").Visible = !IsMoving;

        HumanScoreLabel.Text = Scores["Human"].ToString();
        ComputerScoreLabel.Text = Scores["Computer"].ToString();

        if (Input.IsActionJustPressed("pause"))
        {
            IsMoving = !IsMoving;
        }

        if (IsMoving)
        {
            UpdateBall(delta);
            UpdatePaddlePositions();
        }
    }

    private void UpdateBall(double delta)
    {
        Ball ball = (Ball)GetNode<Area2D>("Ball");
        ball.UpdateBallPosition(delta);
    }

    private float GetNewPaddlePosition(string player)
    {
        Ball ball = GetNode<Ball>("Ball");
        float PaddleHeight = GetNode<Player>("Human").GetNode<CollisionShape2D>("CollisionShape2D").Shape.GetRect().Size.Y;
        float ViewportHeight = GetViewportRect().Size.Y;

        float NewPositionY;

        if (player == "Human")
        {
            NewPositionY = GetGlobalMousePosition().Y;
        }
        else
        {
            NewPositionY = ball.Position.Y;
        }

        NewPositionY = Mathf.Clamp(NewPositionY, PaddleHeight / 2, ViewportHeight - PaddleHeight / 2);

        return NewPositionY;
    }

    private void UpdatePaddlePositions()
    {
        Player Human = (Player)GetNode<Area2D>("Human");
        Player Computer = (Player)GetNode<Area2D>("Computer");


        Human.UpdatePaddlePosition(GetNewPaddlePosition("Human"));
        Computer.UpdatePaddlePosition(GetNewPaddlePosition("Computer"));
    }

    private void OnBounceFromWall(Area2D area)
    {
        if (area.Name != "Ball") return;

        Ball ball = (Ball)area;
        ball.BounceFromWall();
    }

    private void OnPaddleAreaEntered(Area2D area)
    {
        if (area.Name != "Ball") return;

        Ball ball = (Ball)area;
        ball.BounceFromPaddle();
    }

    private void BallOut(Area2D area, string _player)
    {
        if (area.Name != "Ball") return;

        // Pause the game
        IsMoving = false;

        // Reset the ball position and velocity
        Ball ball = (Ball)area;
        ball.ResetBall();

        // Update the scorers score
        Scores[_player] += 1;
        Player player = (Player)GetNode<Area2D>(_player);
        player.PlayScoreSound();
    }

    private void OnLeftWallAreaEntered(Area2D area)
    {
        BallOut(area, "Computer");
    }

    private void OnRightWallAreaEntered(Area2D area)
    {
        BallOut(area, "Human");
    }
}
