class Api::WatchlistsController < ApplicationController
    def index
        @watchlists = Watchlist.all
        render :index
    end

    def show
        @watchlist = Watchlist.find(params[:id])
        render :show
    end

    def create
        @watchlist = Watchlist.new(watchlist_params)

        if @watchlist.save
            render :show
        else
            render json: {errors: @watchlist.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @watchlist = Watchlist.find(params[:id])

        if @watchlist.update(watchlist_params)
            render :show
        else
            render json: {errors: @watchlist.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        @watchlist = Watchlist.find(params[:id])

        if @watchlist
            @watchlist.destroy
            render json: params[:id]
        end
    end

    private
    def watchlist_params
        params.require(:watchlist).permit(:user_id, :student_id, :note, :title)
    end
end